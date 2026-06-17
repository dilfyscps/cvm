import { useMemo, useRef, useState, type DragEvent } from "react";
import { deletePackMedia, uploadPackMedia, type PackMediaFile } from "../../lib/packMedia";

export default function PackMediaLibrary({
  files,
  loading,
  onRefresh,
  onToast,
}: {
  files: PackMediaFile[];
  loading: boolean;
  onRefresh: () => Promise<void>;
  onToast: (message: string, type?: "success" | "error") => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [deletingName, setDeletingName] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return files;
    return files.filter((file) => file.name.toLowerCase().includes(query));
  }, [files, search]);

  async function uploadFiles(fileList: FileList | File[]) {
    const items = Array.from(fileList);
    if (items.length === 0) return;

    setUploading(true);
    let uploaded = 0;

    for (const file of items) {
      try {
        await uploadPackMedia(file);
        uploaded += 1;
      } catch (err) {
        onToast(err instanceof Error ? err.message : "Upload failed", "error");
      }
    }

    setUploading(false);

    if (uploaded > 0) {
      onToast(uploaded === 1 ? "File uploaded" : `${uploaded} files uploaded`);
      await onRefresh();
    }
  }

  async function handleDelete(name: string) {
    setDeletingName(name);
    try {
      await deletePackMedia(name);
      onToast("File removed");
      await onRefresh();
    } catch (err) {
      onToast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingName(null);
    }
  }

  return (
    <div className="glass-card admin-panel-card p-5 sm:p-6">
      <div className="glass-content flex min-h-0 flex-1 flex-col">
        <h2 className="text-title text-white">Media library</h2>
        <p className="text-caption mt-1">Drop images or GIFs to upload.</p>
        <p className="text-caption mt-2">{loading ? "Loading..." : `${files.length} files`}</p>

        <div
          className={`media-dropzone mt-4 ${dragging ? "media-dropzone--active" : ""} ${uploading ? "media-dropzone--busy" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e: DragEvent) => {
            e.preventDefault();
            setDragging(false);
            if (!uploading) void uploadFiles(e.dataTransfer.files);
          }}
          onClick={() => !uploading && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!uploading) inputRef.current?.click();
            }
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="sr-only"
            onChange={(e) => {
              if (e.target.files) void uploadFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <div className="media-dropzone__icon">{uploading ? "↑" : "+"}</div>
          <p className="mt-2 text-sm font-medium">{uploading ? "Uploading..." : "Drop or click"}</p>
          <p className="text-caption mt-1">JPG, PNG, WebP, GIF · 15 MB max</p>
        </div>

        {files.length > 0 && (
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files..."
              className="admin-form-input mt-4"
            />
            <div className="mt-3 max-h-80 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-2">
                {filtered.map((file) => (
                  <div key={file.name} className="media-library-item group">
                    <img src={file.url} alt={file.name} loading="lazy" />
                    {file.isGif && <span className="media-library-item__badge">GIF</span>}
                    <button
                      type="button"
                      onClick={() => handleDelete(file.name)}
                      disabled={deletingName === file.name}
                      className="media-library-item__delete"
                      aria-label={`Delete ${file.name}`}
                    >
                      {deletingName === file.name ? "…" : "×"}
                    </button>
                    <p className="media-library-item__name" title={file.name}>
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
