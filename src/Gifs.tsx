import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BrowsePanel from "./components/BrowsePanel";
import CatalogLayout from "./components/CatalogLayout";
import PosterTile from "./components/PosterTile";
import { useScrollToTopButton } from "./hooks/useScrollToTopButton";
import { copyPageLink } from "./lib/clipboard";
import { fallbackGifPacks } from "../shared/catalog";
import { normalizeTag, toSlug } from "./lib/slug";
import { supabase } from "./lib/supabase";

type CatalogPack = {
  id: string;
  title: string;
  tag: string;
  image: string;
  link: string;
};

export default function Gifs() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [packs, setPacks] = useState<CatalogPack[]>([]);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const showTopButton = useScrollToTopButton();

  useEffect(() => {
    async function loadPacks() {
      const { data, error } = await supabase.from("packs").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Supabase GIF packs error:", error);
        setPacks(
          fallbackGifPacks.map((pack) => ({
            id: pack.id,
            title: pack.title,
            tag: pack.tag,
            image: pack.image,
            link: pack.link ?? "",
          }))
        );
        return;
      }

      const fromDb = (data ?? [])
        .filter((p) => p.type === "gifpack")
        .map((p) => ({
          id: toSlug(p.title),
          title: p.title,
          tag: normalizeTag(p.tag || "SFW"),
          image: p.image,
          link: p.download_url,
        }));

      setPacks(
        fromDb.length > 0
          ? fromDb
          : fallbackGifPacks.map((pack) => ({
              id: pack.id,
              title: pack.title,
              tag: pack.tag,
              image: pack.image,
              link: pack.link ?? "",
            }))
      );
    }
    void loadPacks();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && !packId) {
      navigate(`/gifs/${hash}`, { replace: true });
      return;
    }

    const queryPack = new URLSearchParams(window.location.search).get("pack");
    if (queryPack && !packId) {
      navigate(`/gifs/${queryPack}`, { replace: true });
    }
  }, [navigate, packId]);

  useEffect(() => {
    const targetId = packId ?? window.location.hash.slice(1);
    if (!targetId || packs.length === 0) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(targetId);
      window.setTimeout(() => setHighlightedId(null), 2200);
    }, 100);

    return () => window.clearTimeout(timer);
  }, [packId, packs]);

  const filteredPacks = useMemo(() => {
    return packs.filter((pack) => {
      const matchesSearch = pack.title.toLowerCase().includes(search.toLowerCase());
      if (filter === "SFW") return matchesSearch && pack.tag === "SFW";
      if (filter === "NSFW") return matchesSearch && pack.tag === "NSFW";
      return matchesSearch;
    });
  }, [search, filter, packs]);

  const copyLink = async (pack: CatalogPack) => {
    await copyPageLink(`/gifs/${pack.id}`);
  };

  return (
    <CatalogLayout
      activeNav="/gifs"
      badge="GIF pack vault"
      title="High-quality GIF packs"
      description="Browse NSFW and SFW GIF bundles — same clean layout, fast downloads."
      primaryCta={{ href: "https://discord.gg/fvgnation", label: "Join FVGNATION" }}
      browsePanel={
        <BrowsePanel
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search GIF packs..."
          filter={filter}
          onFilterChange={setFilter}
          count={filteredPacks.length}
        />
      }
      gridHeading="All GIF packs"
      gridCount={filteredPacks.length}
      showTopButton={showTopButton}
    >
      {filteredPacks.map((pack) => (
        <PosterTile
          key={pack.id}
          id={pack.id}
          title={pack.title}
          tag={pack.tag}
          image={pack.image}
          downloadHref={pack.link}
          onCopyLink={() => copyLink(pack)}
          highlighted={highlightedId === pack.id}
        />
      ))}
    </CatalogLayout>
  );
}
