import { useState } from "react";


const websites = [
  {
    title: "Instagram",
    desc: "Follow us for scenepack posts, scenepack updates, and more.",
    link: "https://www.instagram.com/cvmscp/",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  },
  {
    title: "Discord",
    desc: "Talk, Request, and get new pinged scenepack updates from our server.",
    link: "https://discord.gg/h3FTcW3usW",
    icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-color-icon.png",
  },
  {
    title: "TikTok",
    desc: "Watch edits and more on our TikTok.",
    link: "https://tiktok.com/@cvmotic",
    icon: "https://iconape.com/wp-content/files/fd/121669/svg/tiktok-logo-tik-tok-logo-icon-png-svg.png",
  },
  {
    title: "Tumblr",
    desc: "Find gifs, clips, and more on our Tumblr.",
    link: "https://cvmscp.tumblr.com/",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tumblr.svg/3840px-Tumblr.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
  },
];

const scenepacks = [
  {
    title: "arianfzn",
    desc: "High-quality topaz scenepack with clean clips.",
    tag: "SFW",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "brownboyfitt",
    desc: "Smooth clips, edits, and creator-ready footage.",
    tag: "SFW",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "cj delco",
    desc: "Clean browsing and fast download access.",
    tag: "NEW",
    img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=900&auto=format&fit=crop",
  },
];

export default function App() {
  const [search, setSearch] = useState("");

  const filteredPacks = scenepacks.filter((pack) =>
    pack.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#05060b] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(79,70,229,0.15),transparent_30%),linear-gradient(to_bottom,#090a12,#05060b)]" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <a className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-black text-pink-200 shadow-lg">
            CVMSCPS
          </a>

          <div className="absolute left-1/2 -translate-x-1/2">
  <nav className="hidden rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/60 backdrop-blur-xl md:flex gap-8">
    <a className="text-pink-200" href="/">
  Home
</a>

    <a className="hover:text-white" href="/packs">
      Scenepacks
    </a>

    <a className="hover:text-white" href="/requests">
      Requests
    </a>
  </nav>
</div>

        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-28 text-center">

        {/* LOGO */}
        <div className="mx-auto mb-8 flex justify-center">
          <div className="relative flex justify-center">

  <div className="absolute h-40 w-40 rounded-full bg-pink-400/30 blur-3xl" />

  <img
    src="src/img/vite.svg"
    alt="cvm"
    className="relative h-28 w-auto opacity-95"
  />

</div>
        </div>

        <h1 className="text-6xl font-black tracking-tight md:text-7xl">
  <span className="bg-gradient-to-r from-pink-200 via-white to-pink-300 bg-clip-text text-transparent">
    CVMSCPS
  </span>
</h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">
          High-quality scenepacks, clean browsing, and fast downloads — all in one place.
        </p>

        <div className="mt-10 flex justify-center gap-4">
  <a
    href="https://discord.gg/h3FTcW3usW"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-xl bg-pink-200 px-8 py-4 font-bold text-black shadow-[0_0_40px_rgba(255,192,203,.45)] hover:bg-pink-100 transition"
  >
    Join Discord
  </a>

          <a
  href="/packs"
  className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white/70 hover:border-pink-300/50 hover:text-white transition"
>
  Browse Packs
</a>
        </div>

        
      </section>

      {/* WEBSITES */}
      <section id="websites" className="mt-25 mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-4xl font-black">
          Our Websites
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {websites.map((card) => (
            <a
              key={card.title}
              href={card.link}
              className="group rounded-2xl border border-white/10 bg-white/[0.035] p-8 transition hover:-translate-y-1 hover:border-pink-200/50 hover:bg-white/[0.06]"
            >
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-pink-300/10">
  <img
    src={card.icon}
    alt={card.title}
    className="h-8 w-8 object-contain"
  />
</div>

              <h3 className="text-2xl font-black">
                {card.title}
              </h3>

              <p className="mt-4 min-h-[72px] leading-7 text-white/45">
                {card.desc}
              </p>

              
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/25">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black text-pink-200">
              CVMSCPS
            </h3>

            <p className="mt-2 text-white/40">
              Your hub for high-quality scenepacks and creator resources.
            </p>
          </div>

          <p className="text-sm text-white/30">
            © 2026 CVMSCPS. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}