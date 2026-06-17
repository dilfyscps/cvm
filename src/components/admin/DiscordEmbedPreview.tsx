import type { DiscordEmbedDraft } from "../../lib/discordEmbed";

type DiscordEmbedPreviewProps = {
  username: string;
  avatarUrl: string;
  content: string;
  embeds: DiscordEmbedDraft[];
};

function hexColor(color: string) {
  const value = color.replace("#", "").trim();
  return value ? `#${value}` : "#f472b6";
}

export default function DiscordEmbedPreview({
  username,
  avatarUrl,
  content,
  embeds,
}: DiscordEmbedPreviewProps) {
  const visibleEmbeds = embeds.filter(
    (embed) =>
      embed.title ||
      embed.description ||
      embed.url ||
      embed.thumbnailUrl ||
      embed.imageUrl ||
      embed.footerText ||
      embed.authorName ||
      embed.fields.some((field) => field.name && field.value)
  );

  return (
    <div className="discord-preview">
      <div className="discord-preview__header">
        <p className="text-label">Live preview</p>
        <p className="text-caption mt-1">Approximate Discord appearance</p>
      </div>

      <div className="discord-preview__canvas">
        <div className="discord-preview__message">
          <div className="discord-preview__avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
            ) : (
              <span>C</span>
            )}
          </div>

          <div className="discord-preview__body">
            <div className="discord-preview__meta">
              <span className="discord-preview__name">{username.trim() || "CVMSCPS"}</span>
              <span className="discord-preview__badge">APP</span>
              <span className="discord-preview__time">Today at 8:47 PM</span>
            </div>

            {content.trim() && <p className="discord-preview__content">{content}</p>}

            {visibleEmbeds.map((embed) => (
              <div
                key={embed.id}
                className="discord-preview__embed"
                style={{ borderLeftColor: hexColor(embed.color) }}
              >
                {embed.authorName && (
                  <div className="discord-preview__author">
                    {embed.authorIcon && <img src={embed.authorIcon} alt="" />}
                    <span>{embed.authorName}</span>
                  </div>
                )}

                {embed.title && (
                  <p className="discord-preview__embed-title">
                    {embed.url ? (
                      <a href={embed.url} target="_blank" rel="noreferrer">
                        {embed.title}
                      </a>
                    ) : (
                      embed.title
                    )}
                  </p>
                )}

                {embed.description && (
                  <p className="discord-preview__embed-desc">{embed.description}</p>
                )}

                {embed.fields.length > 0 && (
                  <div className="discord-preview__fields">
                    {embed.fields
                      .filter((field) => field.name && field.value)
                      .map((field, index) => (
                        <div
                          key={`${embed.id}-field-${index}`}
                          className={`discord-preview__field ${field.inline ? "is-inline" : ""}`}
                        >
                          <p className="discord-preview__field-name">{field.name}</p>
                          <p className="discord-preview__field-value">{field.value}</p>
                        </div>
                      ))}
                  </div>
                )}

                {embed.imageUrl && (
                  <img src={embed.imageUrl} alt="" className="discord-preview__embed-image" />
                )}

                {(embed.footerText || embed.thumbnailUrl) && (
                  <div className="discord-preview__footer-row">
                    {embed.thumbnailUrl && (
                      <img src={embed.thumbnailUrl} alt="" className="discord-preview__thumb" />
                    )}
                    {embed.footerText && <span className="discord-preview__footer">{embed.footerText}</span>}
                  </div>
                )}
              </div>
            ))}

            {!content.trim() && visibleEmbeds.length === 0 && (
              <p className="discord-preview__empty">Start typing to see your message preview.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
