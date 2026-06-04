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

export default function App() {

  return (
    <main className="min-h-screen overflow-hidden bg-[#05060b] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(236,72,153,.15),transparent_50%),radial-gradient(ellipse_60%_60%_at_20%_50%,rgba(59,130,246,.1),transparent_60%),radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(168,85,247,.05),transparent_50%),linear-gradient(to_bottom,#05060b,#02040c)]" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
  <div className="mx-auto flex min-h-[72px] max-w-7xl flex-col items-center justify-center gap-3 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
    
    <a
      href="/"
      className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-lg font-black text-pink-200 shadow-lg sm:text-xl"
    >
      CVMSCPS
    </a>

    <nav className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-white/60 sm:rounded-full sm:border sm:border-white/10 sm:bg-white/5 sm:px-6 sm:py-3 sm:gap-8">
      <a className="text-pink-200 hover:text-white" href="/">
        Home
      </a>

      <a className="hover:text-white" href="/packs">
        Scenepacks
      </a>

      <a className="hover:text-white" href="/gifs">
        GIFs
      </a>

      <a className="hover:text-white" href="/requests">
        Requests
      </a>
    </nav>
  </div>
</header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-28 text-center">

        {/* LOGO */}
        <div className="mx-auto mb-8 flex justify-center">
          <div className="relative flex justify-center">

            <div className="absolute h-40 w-40 rounded-full bg-pink-400/30 blur-3xl" />

            <img
              src="/img/vite.svg"
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

        <div className="mt-10 flex flex-wrap justify-center gap-4">
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

          <a
  href="/gifs"
  className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white/70 hover:border-pink-300/50 hover:text-white transition"
>
  Browse GIFs
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
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-pink-300/40 hover:shadow-lg hover:shadow-pink-500/20"
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

      {/* COMMUNITY HUB */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-pink-500/15 backdrop-blur-xl hover:shadow-pink-500/20 transition">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-pink-300">Community</p>
            <h2 className="mt-4 text-4xl font-black text-white">
              Join the CVMSCPS Community
            </h2>
            <p className="mt-4 text-white/60 leading-8">
              Stay connected with CVMSCPS for the latest scenepack drops, request support, and community updates. The Discord server is the fastest way to see what&apos;s new.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="https://discord.gg/h3FTcW3usW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-2xl bg-pink-200 px-8 py-4 font-bold text-black shadow-[0_0_40px_rgba(255,192,203,.35)] hover:bg-pink-100 hover:shadow-[0_0_50px_rgba(255,192,203,.45)] transition"
              >
                Join Discord
              </a>

              <a
                href="/requests"
                className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white/70 hover:border-pink-300/50 hover:bg-white/10 hover:shadow-lg hover:shadow-pink-500/15 transition"
              >
                Request a Pack
              </a>
            </div>
          </div>
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

          <div className="flex flex-col items-start gap-3 text-sm text-white/40 sm:items-end">
            <div className="flex flex-wrap gap-4">
              <a href="/fvgify-terms-of-service" className="hover:text-white">
                Terms of Service
              </a>
              <a href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </a>
            </div>
            <p className="text-white/30">© 2026 CVMSCPS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}