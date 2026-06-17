import { supabase } from "./supabase";

/** Create this public bucket in Supabase: Storage → New bucket → name `pack-media`, public ON */
export const PACK_MEDIA_BUCKET = "pack-media";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 15 * 1024 * 1024;

export type PackMediaFile = {
  name: string;
  url: string;
  updatedAt: string;
  isGif: boolean;
};

export function getPackMediaUrl(path: string) {
  const { data } = supabase.storage.from(PACK_MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function sanitizeFileName(name: string) {
  const parts = name.split(".");
  const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : "png";
  const base =
    parts
      .join(".")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "upload";

  return `${base}.${ext}`;
}

export async function listPackMedia(): Promise<PackMediaFile[]> {
  const { data, error } = await supabase.storage
    .from(PACK_MEDIA_BUCKET)
    .list("", { limit: 500, sortBy: { column: "updated_at", order: "desc" } });

  if (error) throw error;

  return (data ?? [])
    .filter((file) => file.name && !file.name.startsWith("."))
    .map((file) => ({
      name: file.name,
      url: getPackMediaUrl(file.name),
      updatedAt: file.updated_at ?? file.created_at ?? "",
      isGif: file.name.toLowerCase().endsWith(".gif"),
    }));
}

export async function uploadPackMedia(file: File): Promise<PackMediaFile> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Only JPG, PNG, WebP, and GIF files are allowed");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("File must be under 15 MB");
  }

  let fileName = sanitizeFileName(file.name);

  const { data: existing } = await supabase.storage
    .from(PACK_MEDIA_BUCKET)
    .list("", { search: fileName });

  if (existing?.some((item) => item.name === fileName)) {
    const ext = fileName.split(".").pop();
    const base = fileName.slice(0, -(ext!.length + 1));
    fileName = `${base}-${Date.now()}.${ext}`;
  }

  const { error } = await supabase.storage
    .from(PACK_MEDIA_BUCKET)
    .upload(fileName, file, { upsert: false, contentType: file.type });

  if (error) throw error;

  return {
    name: fileName,
    url: getPackMediaUrl(fileName),
    updatedAt: new Date().toISOString(),
    isGif: file.type === "image/gif",
  };
}

export async function deletePackMedia(name: string) {
  const { error } = await supabase.storage.from(PACK_MEDIA_BUCKET).remove([name]);
  if (error) throw error;
}
