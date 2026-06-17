export type DiscordEmbedField = {
  name: string;
  value: string;
  inline: boolean;
};

export type DiscordEmbedDraft = {
  id: string;
  title: string;
  description: string;
  url: string;
  color: string;
  thumbnailUrl: string;
  imageUrl: string;
  footerText: string;
  authorName: string;
  authorIcon: string;
  fields: DiscordEmbedField[];
};

export function createEmbedDraft(): DiscordEmbedDraft {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    url: "",
    color: "f472b6",
    thumbnailUrl: "",
    imageUrl: "",
    footerText: "",
    authorName: "",
    authorIcon: "",
    fields: [],
  };
}

export function createEmbedField(): DiscordEmbedField {
  return { name: "", value: "", inline: false };
}

function hexToDecimal(color: string) {
  const parsed = Number.parseInt(color.replace("#", ""), 16);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function cleanEmbed(embed: DiscordEmbedDraft) {
  const fields = embed.fields
    .filter((field) => field.name.trim() && field.value.trim())
    .map((field) => ({
      name: field.name.trim(),
      value: field.value.trim(),
      inline: field.inline,
    }));

  const payload: Record<string, unknown> = {};

  if (embed.title.trim()) payload.title = embed.title.trim();
  if (embed.description.trim()) payload.description = embed.description.trim();
  if (embed.url.trim()) payload.url = embed.url.trim();

  const color = hexToDecimal(embed.color);
  if (color !== undefined) payload.color = color;

  if (embed.thumbnailUrl.trim()) payload.thumbnail = { url: embed.thumbnailUrl.trim() };
  if (embed.imageUrl.trim()) payload.image = { url: embed.imageUrl.trim() };
  if (embed.footerText.trim()) payload.footer = { text: embed.footerText.trim() };
  if (embed.authorName.trim()) {
    payload.author = {
      name: embed.authorName.trim(),
      icon_url: embed.authorIcon.trim() || undefined,
    };
  }
  if (fields.length > 0) payload.fields = fields;

  return Object.keys(payload).length > 0 ? payload : null;
}

export function buildWebhookPayload(input: {
  content: string;
  username: string;
  avatarUrl: string;
  embeds: DiscordEmbedDraft[];
}) {
  const embeds = input.embeds.map(cleanEmbed).filter(Boolean);

  return {
    content: input.content.trim() || undefined,
    username: input.username.trim() || undefined,
    avatar_url: input.avatarUrl.trim() || undefined,
    embeds: embeds.length > 0 ? embeds : undefined,
  };
}

export function embedHasPreview(embed: DiscordEmbedDraft) {
  return Boolean(
    embed.title.trim() ||
      embed.description.trim() ||
      embed.url.trim() ||
      embed.thumbnailUrl.trim() ||
      embed.imageUrl.trim() ||
      embed.footerText.trim() ||
      embed.authorName.trim() ||
      embed.fields.some((field) => field.name.trim() && field.value.trim())
  );
}
