import { useState } from "react";

const scenepacks = [
  {
    title: "5ddie",
    tag: "INCLUDES NSFW",
    img: "src/img/5ddie.png",
    link: "https://mega.nz/folder/kLBDwDAI#NnI7H7LIvWvcOfEj4gaU8A",
  },
  {
    title: "Abel Solervicens",
    tag: "SFW",
    img: "src/img/abelsolervicens.png",
    link: "https://mega.nz/folder/RSIT1Dza#yEO4u6P8Kl_msnNgDyDXnA",
  },
  {
    title: "Aj.Carey",
    tag: "SFW",
    img: "src/img/aj.carey.png",
    link: "https://mega.nz/folder/ceIh3A5b#b7XUPBo_NTA1iAYRB8il0A",
  },
  {
    title: "Alex Mendez",
    tag: "INCLUDES NSFW",
    img: "src/img/alexmendez.png",
    link: "https://mega.nz/folder/YGJVmJAb#Y6EsHnZr5jux8YSveYMzKA",
  },
  {
    title: "Alexsotherfitted",
    tag: "SFW",
    img: "src/img/alexsotherfitted.png",
    link: "https://mega.nz/folder/cS5VFQ4S#scQixq7Z3xRMDsMjjpKgrA",
  },
  {
    title: "AmericanTwink",
    tag: "INCLUDES NSFW",
    img: "src/img/americantwink.png",
    link: "https://mega.nz/folder/RXQBUaiK#poeA5hcW31-v2KZJ7NNv4w",
  },
  {
    title: "Amir Narad",
    tag: "INCLUDES NSFW",
    img: "src/img/amirnarad.png",
    link: "https://mega.nz/folder/AfhB3Dxa#yyOMaYy9doEq5QhPpWiAwg",
  },
  {
    title: "Arianfzn",
    tag: "INCLUDES NSFW",
    img: "src/img/arianfzn.png",
    link: "https://mega.nz/folder/sbYnTAyb#bESl-3lALzYYc1Ad4VZAfA",
  },
  {
    title: "Asher Angel",
    tag: "SFW",
    img: "src/img/asher angel.png",
    link: "https://mega.nz/folder/dDIgnAhR#MKVB_lKMl0cC9aaO9W8AmQ",
  },
  {
    title: "August Berlinger",
    tag: "SFW",
    img: "src/img/augustberlinger.png",
    link: "https://mega.nz/folder/1D5SVCqQ#6tCCsKlX5_Uy-KyavaImGg",
  },
  {
    title: "Austin Taylor",
    tag: "SFW",
    img: "src/img/austintaylorrrr.png",
    link: "https://mega.nz/folder/AbgWlKJZ#VjZBkI6cbqXxUjSLHt3U8A",
  },
  {
    title: "Bach Buquen",
    tag: "SFW",
    img: "src/img/bachbuquen.png",
    link: "https://mega.nz/folder/NaJDFJhB#50fOcJNh-sfKCfN9bfq5VQ",
  },
  
];

export default function Packs() {
    const [search, setSearch] = useState("");

const filteredPacks = scenepacks.filter((pack) =>
  pack.title.toLowerCase().includes(search.toLowerCase())
);
  return (
    <main className="min-h-screen bg-[#05060b] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,192,203,.12),transparent_30%),linear-gradient(to_bottom,#090a12,#05060b)]" />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <a
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-black text-pink-200 shadow-lg"
          >
            CVMSCPS
          </a>

          <nav className="hidden rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/60 md:flex gap-8">
            <a className="hover:text-white" href="/">
              Home
            </a>

            <a className="text-pink-200" href="/packs">
              Scenepacks
            </a>

            <a className="hover:text-white" href="/requests">
              Requests
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
<section className="mx-auto flex min-h-[30vh] max-w-7xl flex-col items-center justify-center px-6 pt-24 text-center">

  <h1 className="text-6xl font-black tracking-tight md:text-7xl">
    Browse Packs
  </h1>

  <p className="mt-5 max-w-2xl text-lg text-white/45">
    Explore high-quality scenepacks, editing clips, and creator resources.
  </p>

</section>

      {/* SEARCH + GRID */}
<section className="mx-auto max-w-7xl px-6 py-16">

  {/* SEARCH */}
  <div className="mb-8 flex justify-center">
    <div className="relative w-full max-w-md">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search scenepacks..."
        className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 pr-12 text-sm text-white outline-none placeholder:text-white/30 focus:border-pink-300"
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
        >
          ✕
        </button>
      )}

    </div>
  </div>

  {/* GRID */}
  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
    {filteredPacks.map((pack) => (
      <div
        key={pack.title}
        className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-pink-300/50"
      >
        <div className="h-60 overflow-hidden bg-black">
          <img
            src={pack.img}
            alt={pack.title}
            className="h-full w-full object-cover object-top opacity-75 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
          />
        </div>

        <div className="p-6">
          <span className="rounded-full border border-pink-300/30 bg-pink-300/10 px-3 py-1 text-xs font-bold text-pink-200">
            {pack.tag}
          </span>

          <h2 className="mt-4 text-2xl font-black">
            {pack.title}
          </h2>

          <a
            href={pack.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-xl bg-pink-200 px-6 py-3 font-bold text-black shadow-[0_0_40px_rgba(255,192,203,.35)] hover:bg-pink-100 transition"
          >
            View Pack
          </a>
        </div>
      </div>
    ))}
  </div>

</section>
    </main>
  );
}