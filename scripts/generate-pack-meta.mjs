import { createClient } from "@supabase/supabase-js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadEnv } from "vite";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = loadEnv("production", root, "");
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

function toSlug(title) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

function normalizeTag(tag) {
  if (tag === "NSFW" || tag === "INCLUDES NSFW") return "NSFW";
  return "SFW";
}

const fallbackGifPacks = [
  {
    id: "boystobreed",
    title: "BOYSTOBREED GIF PACK",
    tag: "NSFW",
    image: "/gif-previews/boystobreed1.gif",
    type: "gifpack",
  },
  {
    id: "pupderix1",
    title: "PUPDERIX GIF PACK",
    tag: "NSFW",
    image: "/gif-previews/pupderix ghost1.gif",
    type: "gifpack",
  },
  {
    id: "pupderix2",
    title: "PUPDERIX GIF PACK 2",
    tag: "NSFW",
    image: "/gif-previews/pupderix camo2.gif",
    type: "gifpack",
  },
];

async function loadImageBuffer(imagePath) {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    const res = await fetch(imagePath);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  }

  const localPath = join(root, "public", imagePath.replace(/^\//, ""));
  if (!existsSync(localPath)) return null;
  return readFileSync(localPath);
}

async function createOgImage(sourceBuffer, outPath, title) {
  const base = sharp(sourceBuffer).rotate().resize(OG_WIDTH, OG_HEIGHT, {
    fit: "cover",
    position: "centre",
  });

  const labelSvg = `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(5,6,11,0)" />
          <stop offset="100%" stop-color="rgba(5,6,11,0.88)" />
        </linearGradient>
      </defs>
      <rect width="${OG_WIDTH}" height="180" y="${OG_HEIGHT - 180}" fill="url(#fade)" />
      <text x="48" y="${OG_HEIGHT - 72}" fill="#f9a8d4" font-family="Arial, sans-serif" font-size="28" font-weight="700">CVMSCPS</text>
      <text x="48" y="${OG_HEIGHT - 28}" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="700">${escapeXml(title.slice(0, 42))}</text>
    </svg>`;

  await base
    .composite([{ input: Buffer.from(labelSvg), top: 0, left: 0 }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outPath);
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function main() {
  const packs = [];
  const ogDir = join(root, "public/og");
  mkdirSync(ogDir, { recursive: true });

  if (url && key) {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.from("packs").select("title,image,tag,type");

    if (error) {
      console.warn("pack-meta: Supabase error:", error.message);
    } else {
      for (const row of data ?? []) {
        packs.push({
          id: toSlug(row.title),
          title: row.title,
          tag: normalizeTag(row.tag || "SFW"),
          image: row.image,
          type: row.type === "gifpack" ? "gifpack" : "scenepack",
        });
      }
    }
  } else {
    console.warn("pack-meta: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set, using fallbacks only");
  }

  for (const pack of fallbackGifPacks) {
    if (!packs.some((entry) => entry.id === pack.id && entry.type === "gifpack")) {
      packs.push(pack);
    }
  }

  let generated = 0;
  for (const pack of packs) {
    try {
      const source = await loadImageBuffer(pack.image);
      if (!source) continue;

      const outPath = join(ogDir, `${pack.id}.jpg`);
      await createOgImage(source, outPath, pack.title);
      pack.ogImage = `/og/${pack.id}.jpg`;
      generated += 1;
    } catch (error) {
      console.warn(`pack-meta: skipped og image for ${pack.id}:`, error instanceof Error ? error.message : error);
    }
  }

  const outPath = join(root, "public/pack-meta.json");
  writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), packs }, null, 2));
  console.log(`pack-meta: wrote ${packs.length} packs, ${generated} og images`);

  const configPath = join(root, "worker/supabase-config.ts");
  writeFileSync(
    configPath,
    `export const SUPABASE_URL = ${JSON.stringify(url ?? "")};\nexport const SUPABASE_ANON_KEY = ${JSON.stringify(key ?? "")};\n`
  );
  console.log("pack-meta: updated worker/supabase-config.ts");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
