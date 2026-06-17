import { useMemo, useState } from "react";
import type { PackMediaFile } from "../../lib/packMedia";

type MediaFilter = "all" | "image" | "gif";

export default function MediaPickerModal({
  files,
  loading,
  selectedUrl,
  onSelect,
  onClose,
}: {
  files: PackMediaFile[];
  loading: boolean;
  selectedUrl?: string;
  onSelect: (file: PackMediaFile) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<MediaFilter>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return files.filter((file) => {
      if (filter === "gif" && !file.isGif) return false;
      if (filter === "image" && file.isGif) return false;
      if (!query) return true;
      return file.name.toLowerCase().includes(query);
    });
  }, [files, filter, search]);

  return (
    <div className="admin-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="glass-card flex max-h-[min(88vh,720px)] w-full max-w-2xl flex-col p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="glass-content flex min-h-0 flex-1 flex-col">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-title text-white">Choose thumbnail</h3>
              <p className="text-caption mt-1">Search your uploaded media.</p>
            </div>
            <button type="button" onClick={onClose} className="btn-secondary text-sm">
              Close
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by filename..."
              className="admin-form-input sm:flex-1"
              autoFocus
            />
            <div className="segmented-control shrink-0">
              {(["all", "image", "gif"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  data-active={filter === value ? "true" : undefined}
                  onClick={() => setFilter(value)}
                >
                  {value === "all" ? "All" : value === "gif" ? "GIFs" : "Images"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
            {loading && (
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="skeleton aspect-square rounded-xl" />
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <p className="text-caption py-10 text-center">
                {files.length === 0 ? "Upload files in the media library first." : "No matches."}
              </p>
            )}

            {!loading && filtered.length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {filtered.map((file) => (
                  <button
                    key={file.name}
                    type="button"
                    onClick={() => onSelect(file)}
                    className={`media-picker-item ${selectedUrl === file.url ? "media-picker-item--selected" : ""}`}
                    title={file.name}
                  >
                    <img src={file.url} alt={file.name} loading="lazy" />
                    <span className="media-picker-item__label">{file.name}</span>
                    {file.isGif && <span className="media-picker-item__badge">GIF</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
