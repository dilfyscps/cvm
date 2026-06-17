import { useEffect, useMemo, useState } from "react";
import DiscordEmbedPreview from "./DiscordEmbedPreview";
import {
  buildWebhookPayload,
  createEmbedDraft,
  createEmbedField,
  type DiscordEmbedDraft,
} from "../../lib/discordEmbed";

const WEBHOOK_KEY = "cvm_discord_webhook";

type PackOption = {
  id: number;
  title: string;
  tag: string;
  image: string;
  download_url: string;
  type: string;
};

type DiscordEmbedSenderProps = {
  packs: PackOption[];
  onToast: (message: string, type?: "success" | "error") => void;
};

function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export default function DiscordEmbedSender({ packs, onToast }: DiscordEmbedSenderProps) {
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem(WEBHOOK_KEY) ?? "");
  const [username, setUsername] = useState("CVMSCPS");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [content, setContent] = useState("");
  const [embeds, setEmbeds] = useState<DiscordEmbedDraft[]>([createEmbedDraft()]);
  const [sending, setSending] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState("");

  useEffect(() => {
    if (webhookUrl) localStorage.setItem(WEBHOOK_KEY, webhookUrl);
  }, [webhookUrl]);

  const payload = useMemo(
    () => buildWebhookPayload({ content, username, avatarUrl, embeds }),
    [content, username, avatarUrl, embeds]
  );

  function updateEmbed(id: string, patch: Partial<DiscordEmbedDraft>) {
    setEmbeds((current) => current.map((embed) => (embed.id === id ? { ...embed, ...patch } : embed)));
  }

  function addEmbed() {
    setEmbeds((current) => [...current, createEmbedDraft()]);
  }

  function duplicateEmbed(id: string) {
    setEmbeds((current) => {
      const source = current.find((embed) => embed.id === id);
      if (!source) return current;
      return [...current, { ...source, id: crypto.randomUUID(), fields: source.fields.map((field) => ({ ...field })) }];
    });
  }

  function removeEmbed(id: string) {
    setEmbeds((current) => (current.length === 1 ? current : current.filter((embed) => embed.id !== id)));
  }

  function addField(embedId: string) {
    setEmbeds((current) =>
      current.map((embed) =>
        embed.id === embedId ? { ...embed, fields: [...embed.fields, createEmbedField()] } : embed
      )
    );
  }

  function updateField(embedId: string, index: number, patch: Partial<ReturnType<typeof createEmbedField>>) {
    setEmbeds((current) =>
      current.map((embed) => {
        if (embed.id !== embedId) return embed;
        const fields = embed.fields.map((field, fieldIndex) =>
          fieldIndex === index ? { ...field, ...patch } : field
        );
        return { ...embed, fields };
      })
    );
  }

  function removeField(embedId: string, index: number) {
    setEmbeds((current) =>
      current.map((embed) =>
        embed.id === embedId
          ? { ...embed, fields: embed.fields.filter((_, fieldIndex) => fieldIndex !== index) }
          : embed
      )
    );
  }

  function applyPackTemplate() {
    const pack = packs.find((entry) => String(entry.id) === selectedPackId);
    if (!pack) return;

    const section = pack.type === "gifpack" ? "gifs" : "packs";
    const slug = toSlug(pack.title);
    const pageUrl = `${window.location.origin}/${section}/${slug}`;
    const tagLabel = pack.tag === "NSFW" ? "NSFW+" : pack.tag;

    setContent(`New drop: **${pack.title}**`);
    setEmbeds([
      {
        ...createEmbedDraft(),
        title: pack.title,
        description: `Download ${pack.title} — ${tagLabel} ${pack.type === "gifpack" ? "GIF pack" : "scenepack"} on CVMSCPS.`,
        url: pageUrl,
        color: "f472b6",
        thumbnailUrl: pack.image,
        imageUrl: pack.image,
        footerText: "CVMSCPS · Scenepack requests",
        authorName: "CVMSCPS",
        fields: [
          { name: "Rating", value: tagLabel, inline: true },
          { name: "Download", value: `[Open pack](${pack.download_url || pageUrl})`, inline: true },
          { name: "Browse", value: `[View on site](${pageUrl})`, inline: true },
        ],
      },
    ]);
    onToast(`Loaded template for ${pack.title}`);
  }

  async function sendMessage() {
    if (!webhookUrl.trim()) {
      onToast("Add a Discord webhook URL first", "error");
      return;
    }

    if (!payload.content && !payload.embeds?.length) {
      onToast("Add message content or at least one embed", "error");
      return;
    }

    setSending(true);
    try {
      const res = await fetch(webhookUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Discord returned ${res.status}`);
      }

      onToast("Message sent to Discord");
    } catch (error) {
      onToast(error instanceof Error ? error.message : "Failed to send message", "error");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="glass-card admin-panel-card discord-sender p-5 sm:p-6">
      <div className="glass-content">
        <div className="discord-sender__header">
          <div>
            <h2 className="text-title text-white">Discord embed sender</h2>
            <p className="text-caption mt-1">Compose and send webhook messages with live preview.</p>
          </div>
          <button type="button" onClick={sendMessage} disabled={sending} className="btn-primary">
            {sending ? "Sending..." : "Send to Discord"}
          </button>
        </div>

        <div className="discord-sender__grid mt-6">
          <div className="discord-sender__editor space-y-4">
            <div className="discord-sender__panel">
              <p className="text-label mb-2">Webhook</p>
              <input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                className="admin-form-input"
              />
            </div>

            <div className="discord-sender__panel discord-sender__panel--split">
              <div>
                <p className="text-label mb-2">Profile name</p>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="CVMSCPS"
                  className="admin-form-input"
                />
              </div>
              <div>
                <p className="text-label mb-2">Profile avatar URL</p>
                <input
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="admin-form-input"
                />
              </div>
            </div>

            <div className="discord-sender__panel">
              <p className="text-label mb-2">Message content</p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Optional text above the embeds. Supports **markdown**."
                className="admin-form-textarea min-h-[7rem]"
              />
              <p className="text-caption mt-2">{content.length}/2000</p>
            </div>

            <div className="discord-sender__panel">
              <p className="text-label mb-2">Pack template</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  value={selectedPackId}
                  onChange={(e) => setSelectedPackId(e.target.value)}
                  className="admin-form-input sm:flex-1"
                >
                  <option value="">Choose a published pack...</option>
                  {packs.map((pack) => (
                    <option key={pack.id} value={pack.id}>
                      {pack.title}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={applyPackTemplate} className="btn-secondary shrink-0">
                  Load pack
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-label">Embeds</p>
                <button type="button" onClick={addEmbed} className="btn-secondary text-sm">
                  Add embed
                </button>
              </div>

              {embeds.map((embed, index) => (
                <details key={embed.id} className="discord-embed-editor" open={index === 0}>
                  <summary className="discord-embed-editor__summary">
                    <span>Embed {index + 1}{embed.title ? ` — ${embed.title}` : ""}</span>
                    <span className="discord-embed-editor__actions">
                      <button
                        type="button"
                        className="btn-secondary px-2 py-1 text-xs"
                        onClick={(e) => {
                          e.preventDefault();
                          duplicateEmbed(embed.id);
                        }}
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        className="btn-danger px-2 py-1 text-xs"
                        onClick={(e) => {
                          e.preventDefault();
                          removeEmbed(embed.id);
                        }}
                      >
                        Delete
                      </button>
                    </span>
                  </summary>

                  <div className="discord-embed-editor__body space-y-3">
                    <div className="discord-sender__panel--split">
                      <div>
                        <p className="text-label mb-2">Title</p>
                        <input
                          value={embed.title}
                          onChange={(e) => updateEmbed(embed.id, { title: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div>
                        <p className="text-label mb-2">Title URL</p>
                        <input
                          value={embed.url}
                          onChange={(e) => updateEmbed(embed.id, { url: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-label mb-2">Description</p>
                      <textarea
                        value={embed.description}
                        onChange={(e) => updateEmbed(embed.id, { description: e.target.value })}
                        className="admin-form-textarea min-h-[6rem]"
                      />
                    </div>

                    <div className="discord-sender__panel--split">
                      <div>
                        <p className="text-label mb-2">Color</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={`#${embed.color.replace("#", "")}`}
                            onChange={(e) => updateEmbed(embed.id, { color: e.target.value.replace("#", "") })}
                            className="discord-color-input"
                          />
                          <input
                            value={embed.color}
                            onChange={(e) => updateEmbed(embed.id, { color: e.target.value.replace("#", "") })}
                            className="admin-form-input"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-label mb-2">Footer</p>
                        <input
                          value={embed.footerText}
                          onChange={(e) => updateEmbed(embed.id, { footerText: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div className="discord-sender__panel--split">
                      <div>
                        <p className="text-label mb-2">Author name</p>
                        <input
                          value={embed.authorName}
                          onChange={(e) => updateEmbed(embed.id, { authorName: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div>
                        <p className="text-label mb-2">Author icon URL</p>
                        <input
                          value={embed.authorIcon}
                          onChange={(e) => updateEmbed(embed.id, { authorIcon: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div className="discord-sender__panel--split">
                      <div>
                        <p className="text-label mb-2">Thumbnail URL</p>
                        <input
                          value={embed.thumbnailUrl}
                          onChange={(e) => updateEmbed(embed.id, { thumbnailUrl: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div>
                        <p className="text-label mb-2">Image URL</p>
                        <input
                          value={embed.imageUrl}
                          onChange={(e) => updateEmbed(embed.id, { imageUrl: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-label">Fields</p>
                        <button type="button" onClick={() => addField(embed.id)} className="btn-secondary text-sm">
                          Add field
                        </button>
                      </div>

                      <div className="space-y-2">
                        {embed.fields.map((field, fieldIndex) => (
                          <div key={`${embed.id}-field-${fieldIndex}`} className="discord-field-editor">
                            <input
                              value={field.name}
                              onChange={(e) => updateField(embed.id, fieldIndex, { name: e.target.value })}
                              placeholder="Field name"
                              className="admin-form-input"
                            />
                            <input
                              value={field.value}
                              onChange={(e) => updateField(embed.id, fieldIndex, { value: e.target.value })}
                              placeholder="Field value"
                              className="admin-form-input"
                            />
                            <label className="discord-field-editor__inline">
                              <input
                                type="checkbox"
                                checked={field.inline}
                                onChange={(e) => updateField(embed.id, fieldIndex, { inline: e.target.checked })}
                              />
                              Inline
                            </label>
                            <button
                              type="button"
                              onClick={() => removeField(embed.id, fieldIndex)}
                              className="btn-danger px-2 py-1 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <DiscordEmbedPreview
            username={username}
            avatarUrl={avatarUrl}
            content={content}
            embeds={embeds}
          />
        </div>
      </div>
    </section>
  );
}
