import { fallbackGifPacks, normalizeTag, toSlug, type SharePack } from "../shared/catalog";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config";

const BRAND_IMAGE = "https://i.pinimg.com/736x/6c/0b/54/6c0b5493db88e9d033263a92ea3f8f6f.jpg";
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const SUPABASE_CACHE_MS = 60_000;
const CRAWLER_UA =
  /bot|crawl|spider|discord|facebook|twitter|linkedin|slack|telegram|whatsapp|embed|preview/i;

type OgMeta = {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
};

type OgEnv = {
  ASSETS: Fetcher;
};

let staticPackCache: SharePack[] | null = null;
let supabaseCache: { fetchedAt: number; packs: SharePack[] } | null = null;

export function isCrawler(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";
  return CRAWLER_UA.test(ua);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function absoluteUrl(origin: string, value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("//")) return `https:${value}`;

  const path = value.startsWith("/") ? value : `/${value}`;
  const encoded = path
    .split("/")
    .map((segment, index) => (index <= 1 ? segment : encodeURIComponent(decodeURIComponent(segment))))
    .join("/");

  return `${origin}${encoded}`;
}

function tagLabel(tag: string) {
  return tag === "NSFW" ? "NSFW+" : tag;
}

function imageMime(url: string) {
  const lower = url.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

function pageMeta(url: URL): OgMeta {
  const origin = url.origin;

  if (url.pathname === "/packs" || url.pathname.startsWith("/packs/")) {
    return {
      title: "Scenepacks · CVMSCPS",
      description: "Browse premium scenepacks from top creators — curated for professional editing.",
      image: BRAND_IMAGE,
      url: `${origin}${url.pathname}${url.search}`,
      imageWidth: OG_WIDTH,
      imageHeight: OG_HEIGHT,
      imageType: "image/jpeg",
    };
  }

  if (url.pathname === "/gifs" || url.pathname.startsWith("/gifs/")) {
    return {
      title: "GIF Packs · CVMSCPS",
      description: "Browse NSFW and SFW GIF bundles with fast downloads on CVMSCPS.",
      image: BRAND_IMAGE,
      url: `${origin}${url.pathname}${url.search}`,
      imageWidth: OG_WIDTH,
      imageHeight: OG_HEIGHT,
      imageType: "image/jpeg",
    };
  }

  if (url.pathname === "/requests") {
    return {
      title: "Request a scenepack · CVMSCPS",
      description: "Submit a scenepack request to the CVMSCPS team on Discord.",
      image: BRAND_IMAGE,
      url: `${origin}/requests`,
      imageWidth: OG_WIDTH,
      imageHeight: OG_HEIGHT,
      imageType: "image/jpeg",
    };
  }

  return {
    title: "CVMSCPS",
    description: "High-quality scenepacks, GIF packs, and fast downloads — all in one place.",
    image: BRAND_IMAGE,
    url: `${origin}/`,
    imageWidth: OG_WIDTH,
    imageHeight: OG_HEIGHT,
    imageType: "image/jpeg",
  };
}

async function resolvePackImage(
  pack: SharePack,
  origin: string,
  env: OgEnv,
  request: Request
): Promise<{ url: string; type: string }> {
  if (pack.ogImage) {
    const assetRes = await env.ASSETS.fetch(new URL(pack.ogImage, request.url), { method: "HEAD" });
    if (assetRes.ok) {
      const url = absoluteUrl(origin, pack.ogImage);
      return { url, type: "image/jpeg" };
    }
  }

  if (pack.image) {
    const url = absoluteUrl(origin, pack.image);
    return { url, type: imageMime(url) };
  }

  return { url: BRAND_IMAGE, type: "image/jpeg" };
}

async function packMeta(
  pack: SharePack,
  section: "packs" | "gifs",
  origin: string,
  env: OgEnv,
  request: Request
): Promise<OgMeta> {
  const label = section === "gifs" ? "GIF pack" : "Scenepack";
  const rating = tagLabel(pack.tag);
  const image = await resolvePackImage(pack, origin, env, request);

  return {
    title: `${pack.title} · CVMSCPS`,
    description: `Download ${pack.title} — ${rating} ${label} on CVMSCPS.`,
    image: image.url,
    url: `${origin}/${section}/${pack.id}`,
    type: "article",
    imageWidth: OG_WIDTH,
    imageHeight: OG_HEIGHT,
    imageType: image.type,
  };
}

async function loadStaticPacks(env: OgEnv, request: Request): Promise<SharePack[]> {
  if (staticPackCache) return staticPackCache;

  try {
    const res = await env.ASSETS.fetch(new URL("/pack-meta.json", request.url));
    if (res.ok) {
      const data = (await res.json()) as { packs?: SharePack[] };
      staticPackCache = data.packs?.length ? data.packs : [...fallbackGifPacks];
      return staticPackCache;
    }
  } catch {
    // fall through
  }

  staticPackCache = [...fallbackGifPacks];
  return staticPackCache;
}

async function loadSupabasePacks(): Promise<SharePack[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

  if (supabaseCache && Date.now() - supabaseCache.fetchedAt < SUPABASE_CACHE_MS) {
    return supabaseCache.packs;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/packs?select=title,image,tag,type`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) return supabaseCache?.packs ?? [];

    const rows = (await res.json()) as Array<{
      title: string;
      image: string;
      tag: string;
      type: string;
    }>;

    const packs = rows.map((row) => ({
      id: toSlug(row.title),
      title: row.title,
      tag: normalizeTag(row.tag || "SFW"),
      image: row.image,
      type: row.type === "gifpack" ? ("gifpack" as const) : ("scenepack" as const),
    }));

    supabaseCache = { fetchedAt: Date.now(), packs };
    return packs;
  } catch {
    return supabaseCache?.packs ?? [];
  }
}

async function findPack(slug: string, section: "packs" | "gifs", env: OgEnv, request: Request) {
  const wantedType = section === "gifs" ? "gifpack" : "scenepack";
  const staticPacks = await loadStaticPacks(env, request);
  const supabasePacks = await loadSupabasePacks();

  const fromSupabase = supabasePacks.find((pack) => pack.id === slug && pack.type === wantedType);
  if (fromSupabase) {
    const staticMatch = staticPacks.find((pack) => pack.id === slug && pack.type === wantedType);
    if (staticMatch?.ogImage) fromSupabase.ogImage = staticMatch.ogImage;
    return fromSupabase;
  }

  const fromStatic = staticPacks.find((pack) => pack.id === slug && pack.type === wantedType);
  if (fromStatic) return fromStatic;

  if (section === "gifs") {
    return fallbackGifPacks.find((pack) => pack.id === slug) ?? null;
  }

  return null;
}

function renderOgHtml(meta: OgMeta) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const image = escapeHtml(meta.image);
  const url = escapeHtml(meta.url);
  const type = escapeHtml(meta.type ?? "website");
  const width = meta.imageWidth ?? OG_WIDTH;
  const height = meta.imageHeight ?? OG_HEIGHT;
  const imageType = escapeHtml(meta.imageType ?? "image/jpeg");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="theme-color" content="#05060b" />
  <meta property="og:site_name" content="CVMSCPS" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:secure_url" content="${image}" />
  <meta property="og:image:type" content="${imageType}" />
  <meta property="og:image:width" content="${width}" />
  <meta property="og:image:height" content="${height}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="${type}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  <link rel="canonical" href="${url}" />
</head>
<body>
  <p><a href="${url}">${title}</a></p>
</body>
</html>`;
}

export async function buildOgResponse(request: Request, env: OgEnv) {
  const url = new URL(request.url);
  const packsMatch = url.pathname.match(/^\/packs\/([^/]+)$/);
  const gifsMatch = url.pathname.match(/^\/gifs\/([^/]+)$/);
  const packFromQuery = url.searchParams.get("pack")?.trim() || null;

  let meta = pageMeta(url);

  const packsSlug = packsMatch?.[1] ?? (url.pathname === "/packs" ? packFromQuery : null);
  const gifsSlug = gifsMatch?.[1] ?? (url.pathname === "/gifs" ? packFromQuery : null);

  if (packsSlug) {
    const pack = await findPack(packsSlug, "packs", env, request);
    if (pack) meta = await packMeta(pack, "packs", url.origin, env, request);
  } else if (gifsSlug) {
    const pack = await findPack(gifsSlug, "gifs", env, request);
    if (pack) meta = await packMeta(pack, "gifs", url.origin, env, request);
  }

  return new Response(renderOgHtml(meta), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=60",
    },
  });
}
