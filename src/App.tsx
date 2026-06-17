import PageBackground from "./components/PageBackground";
import ProfileCard from "./components/ProfileCard";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const websites = [
  {
    title: "Instagram",
    desc: "Follow us for scenepack posts, updates, and more.",
    link: "https://www.instagram.com/cvmscp/",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  },
  {
    title: "Discord",
    desc: "Talk, request packs, and get pinged when new drops go live.",
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
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tumblr.svg/3840px-Tumblr.svg.png",
  },
];

export default function App() {
  return (
    <div className="page-shell page-enter text-white">
      <PageBackground />
      <SiteHeader active="/" />

      <section className="container-app hero-section text-center">
        <div className="relative mx-auto mb-6 flex justify-center">
          <div className="absolute h-20 w-20 rounded-full bg-pink-400/25 blur-3xl" />
          <img
            src="/img/vite.svg"
            alt="CVMSCPS"
            className="relative h-14 w-14 object-contain opacity-95 sm:h-16 sm:w-16"
            decoding="async"
          />
        </div>

        <h1 className="text-display text-gradient-pink">CVMSCPS</h1>
        <p className="text-body mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
          High-quality scenepacks, clean browsing, and fast downloads — all in one place.
        </p>

        <div className="btn-row mt-8 justify-center sm:mt-10">
          <a href="/packs" className="btn-primary">
            Browse Packs
          </a>
          <a href="/gifs" className="btn-secondary">
            Browse GIFs
          </a>
          <a href="/requests" className="btn-secondary">
            Request a pack
          </a>
        </div>
      </section>

      <section className="container-app pb-16">
        <div className="home-profile-row">
          <div className="home-profile-row__copy">
            <span className="liquid-badge">
              <span className="liquid-badge__dot" />
              About
            </span>
            <h2 className="text-title mt-4 text-xl text-white sm:text-2xl">Who we are</h2>
            <p className="text-body mt-3 max-w-md leading-relaxed">
              CVMSCPS is a scenepack and GIF pack project for editors — clean browsing, fast downloads,
              and new drops on the regular. Browse the vault, send a request, or join Discord to catch
              everything first.
            </p>
          </div>

          <ProfileCard />
        </div>
      </section>

      <section className="container-app pb-20">
        <h2 className="text-title text-xl font-bold text-white sm:text-2xl">Our websites</h2>
        <p className="text-caption mt-2">Stay connected across platforms.</p>

        <div className="card-grid mt-6 sm:mt-8">
          {websites.map((card) => (
            <a
              key={card.title}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card interactive-card p-5 sm:p-6"
            >
              <div className="glass-content">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(255,192,203,0.15)] bg-[rgba(255,192,203,0.08)]">
                  <img src={card.icon} alt="" className="h-7 w-7 object-contain" loading="lazy" decoding="async" />
                </div>
                <h3 className="text-base font-bold text-white sm:text-lg">{card.title}</h3>
                <p className="text-caption mt-2 leading-relaxed sm:mt-3">{card.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
