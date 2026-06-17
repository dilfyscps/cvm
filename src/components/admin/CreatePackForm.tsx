import { type FormEvent, type ReactNode } from "react";

const FALLBACK_IMAGE = "/img/yesbrawn.png";

function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-form-section">
      <div className="admin-form-section__head">
        <span className="admin-form-section__step">{step}</span>
        <div>
          <h3 className="admin-form-section__title">{title}</h3>
          {description && <p className="admin-form-section__desc">{description}</p>}
        </div>
      </div>
      <div className="admin-form-section__body">{children}</div>
    </section>
  );
}

type CreatePackFormProps = {
  title: string;
  setTitle: (value: string) => void;
  tag: string;
  setTag: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  image: string;
  setImage: (value: string) => void;
  downloadUrl: string;
  setDownloadUrl: (value: string) => void;
  importCode: string;
  setImportCode: (value: string) => void;
  onImport: () => void;
  onBrowseMedia: () => void;
  onSubmit: (e: FormEvent) => void;
  saving: boolean;
};

export default function CreatePackForm({
  title,
  setTitle,
  tag,
  setTag,
  type,
  setType,
  image,
  setImage,
  downloadUrl,
  setDownloadUrl,
  importCode,
  setImportCode,
  onImport,
  onBrowseMedia,
  onSubmit,
  saving,
}: CreatePackFormProps) {
  const isGif = type === "gifpack";
  const previewTitle = title.trim() || "Pack title preview";
  const tagLabel = tag === "NSFW" ? "NSFW" : "SFW";
  const readyCount = [title.trim(), image.trim(), downloadUrl.trim()].filter(Boolean).length;

  return (
    <form onSubmit={onSubmit} className="admin-create-form admin-panel-card glass-card">
      <div className="glass-content">
        <header className="admin-create-form__header">
          <div>
            <h2 className="text-title text-white">Create pack</h2>
            <p className="text-caption mt-1.5">Fill in the details — preview updates live on the right.</p>
          </div>
        </header>

        <details className="admin-form-import">
          <summary className="admin-form-import__summary">
            <span>Import from existing code</span>
            <span className="admin-form-import__chevron" aria-hidden="true">+</span>
          </summary>
          <div className="admin-form-import__body">
            <textarea
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              placeholder={`{\n  title: "Example",\n  tag: "INCLUDES NSFW",\n  img: "/img/example.png",\n  link: "https://mega.nz/...",\n},`}
              className="admin-form-textarea"
            />
            <button type="button" onClick={onImport} className="btn-secondary mt-3 text-sm">
              Apply import
            </button>
          </div>
        </details>

        <div className="admin-create-form__layout">
          <div className="admin-create-form__main">
            <div className="admin-create-form__fields">
              <FormSection step="01" title="Pack title" description="Shown on the catalog card.">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Creator name or pack title"
                  required
                  className="admin-form-input"
                />
              </FormSection>

              <FormSection step="02" title="Classification" description="Type and content rating.">
                <div className="admin-form-choice-grid">
                  <div>
                    <p className="admin-form-choice-label">Pack type</p>
                    <div className="segmented-control admin-form-segmented">
                      <button
                        type="button"
                        data-active={type === "scenepack" ? "true" : undefined}
                        onClick={() => setType("scenepack")}
                      >
                        Scenepack
                      </button>
                      <button
                        type="button"
                        data-active={type === "gifpack" ? "true" : undefined}
                        onClick={() => setType("gifpack")}
                      >
                        GIF pack
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="admin-form-choice-label">Rating</p>
                    <div className="segmented-control admin-form-segmented">
                      <button
                        type="button"
                        data-active={tag === "SFW" ? "true" : undefined}
                        onClick={() => setTag("SFW")}
                      >
                        SFW
                      </button>
                      <button
                        type="button"
                        data-active={tag === "NSFW" ? "true" : undefined}
                        onClick={() => setTag("NSFW")}
                      >
                        NSFW
                      </button>
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection step="03" title="Thumbnail" description="Pick from your media library or paste a URL.">
                <div className="admin-thumbnail-row">
                  <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://... or /img/example.png"
                    className="admin-form-input"
                  />
                  <button type="button" onClick={onBrowseMedia} className="btn-secondary admin-thumbnail-row__btn">
                    Browse library
                  </button>
                </div>
              </FormSection>

              <FormSection
                step="04"
                title="Download link"
                description={isGif ? "Bunny.net CDN URL." : "Mega.nz folder or file link."}
              >
                <input
                  value={downloadUrl}
                  onChange={(e) => setDownloadUrl(e.target.value)}
                  placeholder={isGif ? "https://..." : "https://mega.nz/..."}
                  className="admin-form-input"
                />
              </FormSection>
            </div>

            <div className="admin-create-form__actions">
              <button type="submit" disabled={saving} className="btn-primary admin-create-form__submit">
                {saving ? "Publishing..." : "Publish pack"}
              </button>
            </div>
          </div>

          <aside className="admin-create-form__preview">
            <div className="admin-preview-panel">
              <div className="admin-preview-panel__head">
                <p className="text-label">Live preview</p>
                <span className="admin-preview-panel__progress">{readyCount}/3</span>
              </div>

              <article className="admin-pack-preview">
                <div className="admin-pack-preview__media">
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      className="admin-pack-preview__img"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                    />
                  ) : (
                    <button type="button" onClick={onBrowseMedia} className="admin-pack-preview__empty">
                      <span className="admin-pack-preview__empty-icon">+</span>
                      <span>Add thumbnail</span>
                    </button>
                  )}
                  <div className="admin-pack-preview__gradient" />
                  <div className="admin-pack-preview__meta">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="pack-badge">{isGif ? "GIF pack" : "Scenepack"}</span>
                      <span className={`pack-badge ${tag === "NSFW" ? "pack-badge--nsfw" : ""}`}>
                        {tagLabel}
                      </span>
                    </div>
                    <h3 className="admin-pack-preview__title">{previewTitle}</h3>
                  </div>
                </div>
              </article>

              <ul className="admin-preview-checklist">
                <li className={title.trim() ? "is-done" : ""}>
                  <span className="admin-preview-checklist__dot" />
                  Title
                </li>
                <li className={image.trim() ? "is-done" : ""}>
                  <span className="admin-preview-checklist__dot" />
                  Thumbnail
                </li>
                <li className={downloadUrl.trim() ? "is-done" : ""}>
                  <span className="admin-preview-checklist__dot" />
                  Download link
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </form>
  );
}
