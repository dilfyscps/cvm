import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import CreatePackForm from "./components/admin/CreatePackForm";
import DiscordEmbedSender from "./components/admin/DiscordEmbedSender";
import MediaPickerModal from "./components/admin/MediaPickerModal";
import PackMediaLibrary from "./components/admin/PackMediaLibrary";
import PageLayout from "./components/PageLayout";
import { listPackMedia, type PackMediaFile } from "./lib/packMedia";
import { supabase } from "./lib/supabase";

type PackRecord = {
  id: number;
  title: string;
  tag: string;
  image: string;
  download_url: string;
  type: string;
};

type Toast = { message: string; type: "success" | "error" } | null;

const AUTH_KEY = "cvm_admin_auth";
const FALLBACK_IMAGE = "/img/yesbrawn.png";

function AdminField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`field-group ${className}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}

function parseImportCode(importCode: string) {
  const isGifPack = importCode.includes("previews:") || importCode.includes("download:");
  const titleMatch = importCode.match(/title:\s*"([^"]+)"/);
  const tagMatch = importCode.match(/tag:\s*"([^"]+)"/);

  if (!titleMatch) {
    throw new Error(isGifPack ? "Could not parse GIF pack code" : "Could not parse scenepack code");
  }

  const tag = (tagMatch?.[1] || "SFW").includes("NSFW") ? "NSFW" : "SFW";

  if (isGifPack) {
    const previewMatch = importCode.match(/previews:\s*\[\s*"([^"]+)"/s);
    const downloadMatch = importCode.match(/download:\s*"([^"]+)"/);

    return {
      title: titleMatch[1],
      tag,
      image: previewMatch?.[1] || "",
      downloadUrl: downloadMatch?.[1] || "",
      type: "gifpack",
    };
  }

  const imgMatch = importCode.match(/img:\s*"([^"]+)"/);
  const linkMatch = importCode.match(/link:\s*"([^"]+)"/);

  return {
    title: titleMatch[1],
    tag,
    image: imgMatch?.[1] || "",
    downloadUrl: linkMatch?.[1] || "",
    type: "scenepack",
  };
}

export default function Admin() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("SFW");
  const [image, setImage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [type, setType] = useState("scenepack");
  const [importCode, setImportCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === "true"
  );
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "change-me";
  const [packs, setPacks] = useState<PackRecord[]>([]);
  const [loadingPacks, setLoadingPacks] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<PackMediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [deletePack, setDeletePack] = useState<PackRecord | null>(null);
  const [editPack, setEditPack] = useState<PackRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<"create" | "edit">("create");

  const scenepackCount = packs.filter((p) => p.type !== "gifpack").length;
  const gifpackCount = packs.filter((p) => p.type === "gifpack").length;

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const loadPacks = useCallback(async () => {
    setLoadingPacks(true);
    const { data, error } = await supabase
      .from("packs")
      .select("*")
      .order("created_at", { ascending: false });
    setLoadingPacks(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }
    setPacks((data as PackRecord[]) ?? []);
  }, [showToast]);

  const loadMedia = useCallback(async () => {
    setLoadingMedia(true);
    try {
      setMediaFiles(await listPackMedia());
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Could not load media", "error");
    } finally {
      setLoadingMedia(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (!authenticated) return;

    let active = true;

    async function fetchPacks() {
      setLoadingPacks(true);
      const { data, error } = await supabase
        .from("packs")
        .select("*")
        .order("created_at", { ascending: false });
      if (!active) return;
      setLoadingPacks(false);
      if (error) {
        showToast(error.message, "error");
        return;
      }
      setPacks((data as PackRecord[]) ?? []);
    }

    async function fetchMedia() {
      setLoadingMedia(true);
      try {
        const files = await listPackMedia();
        if (!active) return;
        setMediaFiles(files);
      } catch (err) {
        if (!active) return;
        showToast(err instanceof Error ? err.message : "Could not load media", "error");
      } finally {
        if (active) setLoadingMedia(false);
      }
    }

    void fetchPacks();
    void fetchMedia();

    return () => {
      active = false;
    };
  }, [authenticated, showToast]);

  useEffect(() => {
    if (!editPack && !deletePack && !mediaPickerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEditPack(null);
        setDeletePack(null);
        setMediaPickerOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editPack, deletePack, mediaPickerOpen]);

  function login(e: FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setAuthenticated(true);
      setPassword("");
      return;
    }
    showToast("Incorrect password", "error");
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    setPacks([]);
    setMediaFiles([]);
  }

  function openMediaPicker(target: "create" | "edit") {
    setMediaPickerTarget(target);
    setMediaPickerOpen(true);
    void loadMedia();
  }

  function handleMediaSelect(file: PackMediaFile) {
    if (mediaPickerTarget === "edit" && editPack) {
      setEditPack({ ...editPack, image: file.url });
    } else {
      setImage(file.url);
    }
    setMediaPickerOpen(false);
    showToast(`Selected ${file.name}`);
  }

  async function createPack(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from("packs").insert({
      title: title.trim(),
      tag,
      image: image.trim(),
      download_url: downloadUrl.trim(),
      type,
      updated: true,
    });

    setSaving(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    showToast("Pack published");
    await loadPacks();
    setTitle("");
    setTag("SFW");
    setImage("");
    setDownloadUrl("");
    setType("scenepack");
    setImportCode("");
  }

  function handleImport() {
    try {
      const parsed = parseImportCode(importCode);
      setTitle(parsed.title);
      setTag(parsed.tag);
      setImage(parsed.image);
      setDownloadUrl(parsed.downloadUrl);
      setType(parsed.type);
      showToast("Import applied");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Import failed", "error");
    }
  }

  async function saveEdit() {
    if (!editPack) return;
    setEditing(true);

    const { error } = await supabase
      .from("packs")
      .update({
        title: editPack.title.trim(),
        tag: editPack.tag,
        image: editPack.image.trim(),
        download_url: editPack.download_url.trim(),
        type: editPack.type,
      })
      .eq("id", editPack.id);

    setEditing(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    setEditPack(null);
    showToast("Pack updated");
    await loadPacks();
  }

  async function confirmDelete() {
    if (!deletePack) return;
    setDeleting(true);

    const { error } = await supabase.from("packs").delete().eq("id", deletePack.id);

    setDeleting(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    setDeletePack(null);
    showToast("Pack deleted");
    await loadPacks();
  }

  if (!authenticated) {
    return (
      <PageLayout showFooter={false}>
        <section className="container-app flex min-h-[75vh] items-center justify-center py-16">
          <div className="glass-card w-full max-w-md p-8">
            <div className="glass-content">
              <p className="text-label">Admin access</p>
              <h1 className="text-title mt-2 text-white">Sign in</h1>
              <p className="text-caption mt-2">Manage scenepacks and GIF packs.</p>

              <form onSubmit={login} className="mt-8 space-y-4">
                <AdminField label="Password">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    className="admin-form-input"
                    required
                  />
                </AdminField>
                <button type="submit" className="btn-primary w-full">
                  Sign in
                </button>
              </form>

              <a href="/" className="link-subtle mt-6 inline-block text-sm">
                ← Back to site
              </a>
            </div>
          </div>
        </section>
        {toast && <div className={`admin-toast admin-toast--${toast.type}`}>{toast.message}</div>}
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false}>
      <section className="container-app py-10 sm:py-14">
        <div className="glass-content flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-label">Admin dashboard</p>
            <h1 className="text-display mt-1 text-gradient-pink">Manage packs</h1>
            <p className="text-body mt-2">Publish, edit, and remove scenepacks and GIF packs.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => loadPacks()} className="btn-secondary text-sm">
              Refresh
            </button>
            <button type="button" onClick={logout} className="btn-secondary text-sm">
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total packs", value: packs.length },
            { label: "Scenepacks", value: scenepackCount },
            { label: "GIF packs", value: gifpackCount },
            { label: "Status", value: "Live" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <div className="glass-content">
                <p className="text-label">{stat.label}</p>
                <p className="text-title mt-2 text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-dashboard-row mt-8">
          <CreatePackForm
            title={title}
            setTitle={setTitle}
            tag={tag}
            setTag={setTag}
            type={type}
            setType={setType}
            image={image}
            setImage={setImage}
            downloadUrl={downloadUrl}
            setDownloadUrl={setDownloadUrl}
            importCode={importCode}
            setImportCode={setImportCode}
            onImport={handleImport}
            onBrowseMedia={() => openMediaPicker("create")}
            onSubmit={createPack}
            saving={saving}
          />

          <PackMediaLibrary
            files={mediaFiles}
            loading={loadingMedia}
            onRefresh={loadMedia}
            onToast={showToast}
          />

          <div className="glass-card admin-panel-card p-5 sm:p-6">
            <div className="glass-content flex min-h-0 flex-1 flex-col">
              <h2 className="text-title text-white">Published packs</h2>
              <p className="text-caption mt-1">
                {loadingPacks ? "Loading..." : `${packs.length} total`}
              </p>

              <div className="admin-published-list mt-4 space-y-3">
                {loadingPacks && packs.length === 0 &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="skeleton h-16 rounded-xl" />
                  ))}

                {!loadingPacks && packs.length === 0 && (
                  <p className="text-caption py-8 text-center">No packs yet.</p>
                )}

                {packs.map((pack) => (
                  <div
                    key={pack.id}
                    className="flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3"
                  >
                    <img
                      src={pack.image || FALLBACK_IMAGE}
                      alt={pack.title}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{pack.title}</p>
                      <p className="text-caption">#{pack.id}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <span className="pack-badge">
                          {pack.type === "gifpack" ? "GIF" : "Scene"}
                        </span>
                        <span className={`pack-badge ${pack.tag === "NSFW" ? "pack-badge--nsfw" : ""}`}>
                          {pack.tag}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => setEditPack(pack)}
                        className="btn-secondary px-2 py-1 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletePack(pack)}
                        className="btn-danger px-2 py-1 text-xs"
                      >
                        Del
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <DiscordEmbedSender packs={packs} onToast={showToast} />
        </div>
      </section>

      {toast && <div className={`admin-toast admin-toast--${toast.type}`}>{toast.message}</div>}

      {mediaPickerOpen && (
        <MediaPickerModal
          files={mediaFiles}
          loading={loadingMedia}
          selectedUrl={mediaPickerTarget === "edit" ? editPack?.image : image}
          onSelect={handleMediaSelect}
          onClose={() => setMediaPickerOpen(false)}
        />
      )}

      {editPack && (
        <div className="admin-modal-backdrop" onClick={() => setEditPack(null)} role="presentation">
          <div
            className="glass-card w-full max-w-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="glass-content">
              <h3 className="text-title text-white">Edit pack</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <AdminField label="Title">
                  <input
                    value={editPack.title}
                    onChange={(e) => setEditPack({ ...editPack, title: e.target.value })}
                    className="admin-form-input"
                  />
                </AdminField>
                <AdminField label="Rating">
                  <select
                    value={editPack.tag}
                    onChange={(e) => setEditPack({ ...editPack, tag: e.target.value })}
                    className="admin-form-input"
                  >
                    <option value="SFW">SFW</option>
                    <option value="NSFW">NSFW</option>
                  </select>
                </AdminField>
                <AdminField label="Type">
                  <select
                    value={editPack.type}
                    onChange={(e) => setEditPack({ ...editPack, type: e.target.value })}
                    className="admin-form-input"
                  >
                    <option value="scenepack">Scenepack</option>
                    <option value="gifpack">GIF pack</option>
                  </select>
                </AdminField>
                <AdminField label="Thumbnail">
                  <div className="flex flex-col gap-2">
                    <input
                      value={editPack.image}
                      onChange={(e) => setEditPack({ ...editPack, image: e.target.value })}
                      className="admin-form-input"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPicker("edit")}
                      className="btn-secondary text-sm"
                    >
                      Browse library
                    </button>
                  </div>
                </AdminField>
                <AdminField label="Download URL" className="md:col-span-2">
                  <input
                    value={editPack.download_url}
                    onChange={(e) => setEditPack({ ...editPack, download_url: e.target.value })}
                    className="admin-form-input"
                  />
                </AdminField>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setEditPack(null)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="button" onClick={saveEdit} disabled={editing} className="btn-primary flex-1">
                  {editing ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletePack && (
        <div className="admin-modal-backdrop" onClick={() => setDeletePack(null)} role="presentation">
          <div
            className="glass-card w-full max-w-md p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="glass-content">
              <h3 className="text-title text-white">Delete pack</h3>
              <p className="text-body mt-3">
                Delete <span className="font-medium text-white">{deletePack.title}</span>? This cannot be undone.
              </p>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setDeletePack(null)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="button" onClick={confirmDelete} disabled={deleting} className="btn-danger flex-1">
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
