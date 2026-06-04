import { useEffect, useMemo, useState } from "react";

const gifPacks = [
  {
    id: "boystobreed",
    title: "boystobreed",
    tag: "NSFW",
    img: "/gif-previews/boystobreed-fucking1.gif",
    download: "https://cvmscpgif.b-cdn.net/boystobreed.zip",
    description: "NSFW GIF pack of boystobreed, discord.gg/fvgnation & discord.gg/cvmscp",
    files: "10 GIFs & More Soon",
    creator: "boystobreed",
    socialUrl: "https://twitter.com/boystobreed",
    socialLabel: "Twitter",
  },
  {
    id: "pupderix",
    title: "pupderix",
    tag: "NSFW",
    img: "/gif-previews/pupderix-ghost3.gif",
    download: "https://cvmscpgif.b-cdn.net/pupderix.zip",
    description: "NSFW GIF pack of pupderix, discord.gg/fvgnation & discord.gg/cvmscp",
    files: "8 GIFs & More Soon",
    creator: "pupderix",
    socialUrl: "https://twitter.com/pupderix",
    socialLabel: "Twitter",
  },
];

export default function Gifs() {
  const [highlightedPack, setHighlightedPack] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | "NSFW" | "SFW">("All");
  const [search, setSearch] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [sort, setSort] = useState<"Title" | "FilesHigh" | "FilesLow">("Title");

  const sortOptions = [
    { value: "Title", label: "Title" },
    { value: "FilesHigh", label: "Files high → low" },
    { value: "FilesLow", label: "Files low → high" },
  ] as const;

  const filteredPacks = useMemo(
    () =>
      gifPacks
        .filter((pack) => (filter === "All" ? true : pack.tag === filter))
        .filter((pack) => pack.title.toLowerCase().includes(search.toLowerCase())),
    [filter, search]
  );

  const sortedPacks = useMemo(() => {
    const packs = [...filteredPacks];

    switch (sort) {
      case "FilesHigh":
        return packs.sort(
          (a, b) =>
            parseInt(b.files, 10) - parseInt(a.files, 10)
        );
      case "FilesLow":
        return packs.sort(
          (a, b) =>
            parseInt(a.files, 10) - parseInt(b.files, 10)
        );
      default:
        return packs.sort((a, b) => a.title.localeCompare(b.title));
    }
  }, [filteredPacks, sort]);

  const nsfwPacks = sortedPacks.filter((pack) => pack.tag === "NSFW");
  const sfwPacks = sortedPacks.filter((pack) => pack.tag === "SFW");

  const goToPack = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlightedPack(id);
    window.history.replaceState(null, "", `#${id}`);

    window.setTimeout(() => {
      setHighlightedPack(null);
    }, 2200);
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyPackLink = async (id: string) => {
    const url = `${window.location.origin}/gifs#${id}`;
    await navigator.clipboard.writeText(url);
    setCopiedLink(id);

    window.setTimeout(() => {
      setCopiedLink(null);
    }, 1800);
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlightedPack(hash);

    const timer = window.setTimeout(() => {
      setHighlightedPack(null);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPackGrid = (
    packs: typeof gifPacks,
    heading: string,
    sectionId?: string
  ) => (
    <section id={sectionId} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-black text-white">{heading}</h2>
          <p className="mt-2 text-sm text-white/50">
            {packs.length} pack{packs.length === 1 ? "" : "s"} available.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {packs.map((pack) => (
          <article
            id={pack.id}
            key={pack.id}
            className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f1220] shadow-2xl shadow-pink-500/15 transition duration-300 hover:-translate-y-1 hover:border-pink-300/40 hover:shadow-pink-500/30 ${
              highlightedPack === pack.id
                ? "ring-2 ring-pink-300/90 shadow-[0_0_50px_rgba(236,72,153,0.40)]"
                : ""
            }`}
          >
            <div className="relative overflow-hidden bg-black/40 aspect-square">
              <img
                src={pack.img}
                alt={pack.title}
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-4">
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                  <span className="rounded-full border border-pink-300/30 bg-pink-300/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.35em] text-pink-200">
                    {pack.tag}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-3">
              <div className="space-y-3">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-sm font-black text-white line-clamp-1">
  {pack.title}
</h2>
                  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <a
                      href={pack.socialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] sm:px-3 sm:py-2 sm:text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:shadow-lg hover:shadow-pink-500/10"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-pink-200" />
                      {pack.socialLabel}
                    </a>
                    <button
                      onClick={() => copyPackLink(pack.id)}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] sm:px-3 sm:py-2 sm:text-xs font-bold text-white/70 transition hover:bg-white/10 hover:shadow-lg hover:shadow-white/5"
                      aria-label={`Copy link for ${pack.title}`}
                    >
                      {copiedLink === pack.id ? "Copied" : "Copy link"}
                    </button>
                  </div>
                </div>
                <p className="hidden">{pack.description}</p>
              </div>

    
              <div>
                <p className="text-sm sm:text-base font-semibold text-white">{pack.files}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.35em] text-white/40">Files</p>
              </div>

              <a
                href={pack.download}
                download
                className="inline-flex items-center justify-center rounded-full bg-pink-200 px-2 py-2 text-[10px] font-bold sm:px-4 sm:py-3 sm:text-sm"
              >
                Download ZIP
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <main className="min-h-screen bg-[#05060b] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(236,72,153,.15),transparent_50%),radial-gradient(ellipse_60%_60%_at_20%_50%,rgba(59,130,246,.1),transparent_60%),radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(168,85,247,.05),transparent_50%),linear-gradient(to_bottom,#05060b,#02040c)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <a
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-black text-pink-200 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 transition"
          >
            CVMSCPS
          </a>

          <nav className="hidden items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/60 md:flex gap-8">
            <a className="hover:text-pink-200 transition" href="/">
              Home
            </a>
            <a className="hover:text-pink-200 transition" href="/packs">
              Scenepacks
            </a>
            <a className="text-pink-200" href="/gifs">
              GIFs
            </a>
            <a className="hover:text-pink-200 transition" href="/requests">
              Requests
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-10">
        <div className="grid gap-6 lg:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-pink-300/20 bg-pink-300/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-pink-200">
              <span className="h-2.5 w-2.5 rounded-full bg-pink-200" />
              GIF pack vault
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              NSFW / SFW GIF PACKS
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/60">
              Download fresh NSFW and SFW GIF bundles for discord.gg/fvgnation and safe outside sharing. The layout stays compact and desktop-ready with a refined mobile grid.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://discord.gg/fvgnation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-2xl bg-pink-200 px-6 py-4 text-sm font-black text-black shadow-[0_0_30px_rgba(255,192,203,.25)] transition hover:bg-pink-100 hover:shadow-[0_0_40px_rgba(255,192,203,.35)]"
              >
                Join FVGNATION
              </a>
              <a
                href="/"
                className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:border-pink-300/50 hover:bg-white/10"
              >
                Home
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-pink-500/20 backdrop-blur-xl hover:shadow-pink-500/30 transition">
            <div className="space-y-6">
              <div className="rounded-[1.5rem] bg-[#070b16] p-6 shadow-lg shadow-pink-500/10">
                <p className="text-sm uppercase tracking-[0.35em] text-pink-200/70">
                  Latest drop
                </p>
                <h2 className="mt-4 text-3xl font-black text-white">boystobreed</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  Fresh NSFW content ready for instant download and seamless sharing.
                </p>
                <button
                  onClick={() => goToPack("boystobreed")}
                  className="mt-6 inline-flex rounded-2xl border border-pink-300/30 bg-pink-300/10 px-5 py-3 text-sm font-bold text-pink-200 transition hover:bg-pink-300/20 hover:border-pink-300/50 hover:shadow-lg hover:shadow-pink-500/15"
                >
                  Go to pack
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 bg-[#05060b]/95 pb-4 backdrop-blur-xl px-4 sm:px-6 pt-4 shadow-lg shadow-pink-500/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 text-sm text-white/70 shadow-md shadow-pink-500/5">
            {(["All", "NSFW", "SFW"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-full px-4 py-2 font-semibold transition ${
                  filter === option
                    ? "bg-pink-200 text-black shadow-lg shadow-pink-500/20"
                    : "hover:bg-white/10"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => goToPack("nsfw-section")}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-pink-300/40 hover:bg-white/10"
            >
              Jump to NSFW
            </button>
            <button
              type="button"
              onClick={() => goToPack("sfw-section")}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-pink-300/40 hover:bg-white/10"
            >
              Jump to SFW
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1.3fr_0.9fr_0.8fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0e1220]/95 px-4 py-4 shadow-lg shadow-pink-500/10">
            <label className="text-xs uppercase tracking-[0.35em] text-white/40">
              Search packs
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search GIF packs..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070f] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-pink-300 focus:bg-[#0a0d1a] focus:shadow-lg focus:shadow-pink-500/30 transition"
            />
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0e1220]/95 px-4 py-4 shadow-lg shadow-pink-500/10">
            <label className="text-xs uppercase tracking-[0.35em] text-white/40">
              Sort packs
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sortOptions[number]["value"])}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070f] px-4 py-3 text-sm text-white outline-none focus:border-pink-300 focus:bg-[#0a0d1a] focus:shadow-lg focus:shadow-pink-500/30 transition"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-3xl border border-pink-300/20 bg-pink-300/10 px-4 py-3 text-sm text-white/90 shadow-lg shadow-pink-500/15">
            <p className="font-semibold">{sortedPacks.length} visible</p>
            <p className="mt-1 text-white/60">Filtered, searchable, sorted.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20 pt-8">
        {filter === "All" ? (
          <div className="space-y-16">
            {renderPackGrid(nsfwPacks, "NSFW Packs", "nsfw-section")}
            {renderPackGrid(sfwPacks, "SFW Packs", "sfw-section")}
          </div>
        ) : (
          <div className="space-y-16">
            {renderPackGrid(sortedPacks, `${filter} Packs`, filter === "NSFW" ? "nsfw-section" : "sfw-section")}
          </div>
        )}
      </section>

      {showTopButton && (
        <button
          type="button"
          onClick={goToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-pink-200 px-5 py-3 text-sm font-bold text-black shadow-[0_12px_30px_rgba(236,72,153,0.25)] transition hover:bg-pink-100 hover:shadow-[0_16px_40px_rgba(236,72,153,0.35)]"
        >
          Go to top
        </button>
      )}
    </main>
  );
}
