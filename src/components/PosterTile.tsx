const FALLBACK_IMAGE = "/img/yesbrawn.png";

type PosterTileProps = {
  id?: string;
  title: string;
  tag: string;
  image: string;
  downloadHref: string;
  onCopyLink?: () => void;
  copyLabel?: string;
  highlighted?: boolean;
};

export default function PosterTile({
  id,
  title,
  tag,
  image,
  downloadHref,
  onCopyLink,
  copyLabel = "Copy link",
  highlighted = false,
}: PosterTileProps) {
  const tagLabel = tag === "INCLUDES NSFW" || tag === "NSFW" ? "NSFW+" : tag;

  return (
    <article
      id={id}
      className={`poster-tile group ${highlighted ? "poster-tile--highlighted" : ""}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
        <img
          src={image || FALLBACK_IMAGE}
          alt={title}
          loading="lazy"
          decoding="async"
          className="poster-tile__img"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 pointer-events-none">
          <span className="pack-badge">{tagLabel}</span>
          <h3 className="mt-1.5 line-clamp-2 text-xs font-semibold leading-snug text-white sm:mt-2 sm:text-sm">
            {title}
          </h3>
        </div>
        <div className="poster-tile__overlay">
          {onCopyLink && (
            <button type="button" onClick={onCopyLink} className="btn-secondary w-full !min-h-[44px] text-sm">
              {copyLabel}
            </button>
          )}
          <a
            href={downloadHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full !min-h-[44px] text-sm"
          >
            Download
          </a>
        </div>
      </div>
    </article>
  );
}
