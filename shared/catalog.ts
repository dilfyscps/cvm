export function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export function normalizeTag(tag: string) {
  if (tag === "NSFW" || tag === "INCLUDES NSFW") return "NSFW";
  return "SFW";
}

export type SharePack = {
  id: string;
  title: string;
  tag: string;
  image: string;
  type: "scenepack" | "gifpack";
  link?: string;
  ogImage?: string;
};

export const fallbackGifPacks: SharePack[] = [
  {
    id: "boystobreed",
    title: "BOYSTOBREED GIF PACK",
    tag: "NSFW",
    image: "/gif-previews/boystobreed1.gif",
    type: "gifpack",
    link: "https://cvmscpgif.b-cdn.net/boystobreed.zip",
  },
  {
    id: "pupderix1",
    title: "PUPDERIX GIF PACK",
    tag: "NSFW",
    image: "/gif-previews/pupderix ghost1.gif",
    type: "gifpack",
    link: "https://cvmscpgif.b-cdn.net/pupderix.zip",
  },
  {
    id: "pupderix2",
    title: "PUPDERIX GIF PACK 2",
    tag: "NSFW",
    image: "/gif-previews/pupderix camo2.gif",
    type: "gifpack",
    link: "https://cvmscpgif.b-cdn.net/pupderix%20camo.zip",
  },
];
