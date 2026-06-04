import { useEffect, useMemo, useState } from "react";

const scenepacks = [
  {
    title: "5ddie",
    tag: "INCLUDES NSFW",
    img: "/img/5ddie.png",
    link: "https://mega.nz/folder/kLBDwDAI#NnI7H7LIvWvcOfEj4gaU8A",
  },
  {
    title: "Abel Solervicens",
    tag: "SFW",
    img: "/img/abelsolervicens.png",
    link: "https://mega.nz/folder/RSIT1Dza#yEO4u6P8Kl_msnNgDyDXnA",
  },
  {
    title: "Aj.Carey",
    tag: "SFW",
    img: "/img/aj.carey.png",
    link: "https://mega.nz/folder/ceIh3A5b#b7XUPBo_NTA1iAYRB8il0A",
  },
  {
  title: "Alekxbrandt",
  tag: "INCLUDES NSFW",
  img: "/img/alekxbrandt.png",
  link: "https://mega.nz/folder/9O4TUQgb#geLJuL9ZkSzYXCgUuTtbNA",
},
  {
    title: "Alex Mendez",
    tag: "INCLUDES NSFW",
    img: "/img/alexmendez.png",
    link: "https://mega.nz/folder/YGJVmJAb#Y6EsHnZr5jux8YSveYMzKA",
  },
  {
    title: "Alexsotherfitted",
    tag: "SFW",
    img: "/img/alexsotherfitted.png",
    link: "https://mega.nz/folder/cS5VFQ4S#scQixq7Z3xRMDsMjjpKgrA",
  },
  {
    title: "AmericanTwink",
    tag: "INCLUDES NSFW",
    img: "/img/americantwink.png",
    link: "https://mega.nz/folder/RXQBUaiK#poeA5hcW31-v2KZJ7NNv4w",
  },
  {
    title: "Amir Narad",
    tag: "INCLUDES NSFW",
    img: "/img/amirnarad.png",
    link: "https://mega.nz/folder/AfhB3Dxa#yyOMaYy9doEq5QhPpWiAwg",
  },
  {
    title: "Arianfzn",
    tag: "INCLUDES NSFW",
    img: "/img/arianfzn.png",
    link: "https://mega.nz/folder/sbYnTAyb#bESl-3lALzYYc1Ad4VZAfA",
  },
  {
    title: "Asher Angel",
    tag: "SFW",
    img: "/img/asher angel.png",
    link: "https://mega.nz/folder/dDIgnAhR#MKVB_lKMl0cC9aaO9W8AmQ",
  },
  {
    title: "August Berlinger",
    tag: "SFW",
    img: "/img/augustberlinger.png",
    link: "https://mega.nz/folder/1D5SVCqQ#6tCCsKlX5_Uy-KyavaImGg",
  },
  {
    title: "Austin Taylor",
    tag: "SFW",
    img: "/img/austintaylorrrr.png",
    link: "https://mega.nz/folder/AbgWlKJZ#VjZBkI6cbqXxUjSLHt3U8A",
  },
  {
    title: "Bach Buquen",
    tag: "SFW",
    img: "/img/bachbuquen.png",
    link: "https://mega.nz/folder/NaJDFJhB#50fOcJNh-sfKCfN9bfq5VQ",
  },
  {
  title: "Ben Verbeck",
  tag: "INCLUDES NSFW",
  img: "/img/benverbeck.png",
  link: "https://mega.nz/folder/0WJxHBzC#QZxyMvqeGqsnNRUbdUpcmQ",
},
{
  title: "Brownboyfitt",
  tag: "INCLUDES NSFW",
  img: "/img/brownboyfitt.png",
  link: "https://mega.nz/folder/0LgBgQiZ#z40X2rIeDB4io-vAZ2-15A",
},
{
  title: "Bwcblake",
  tag: "INCLUDES NSFW",
  img: "/img/bwcblake.png",
  link: "https://mega.nz/folder/wLJWnZ5S#V534Xq2mTlkQZ1VXPmhQOg",
},
{
  title: "Cashmoneyrk",
  tag: "SFW",
  img: "/img/cashmoneyrk.png",
  link: "https://mega.nz/folder/tXJmkSxa#vpC6sL82b0OCJvbJt1JYjg",
},
{
  title: "Chaserdye28",
  tag: "SFW",
  img: "/img/chaserdye28.png",
  link: "https://mega.nz/folder/IKpSiISJ#-oFQQv68aOSqdNi8UKVZvg",
},
{
  title: "Chris Damned",
  tag: "INCLUDES NSFW",
  img: "/img/chrisdamned.png",
  link: "https://mega.nz/folder/FXwG1ChQ#CjqCpFVMlug7s2CEsCj4KQ",
},
{
  title: "CJ Delco",
  tag: "INCLUDES NSFW",
  img: "/img/cjdelco.png",
  link: "https://mega.nz/folder/hapmhaxD#9tOzKPQpIUBoRXMy4nn8vA",
},
{
  title: "CJ Clark",
  tag: "INCLUDES NSFW",
  img: "/img/cj clark.png",
  link: "https://mega.nz/folder/JHwhSCyL#L7o0KuYJVniw0mZqWj-hgw",
},
{
  title: "Clark Reid",
  tag: "INCLUDES NSFW",
  img: "/img/clarkreid.png",
  link: "https://mega.nz/folder/wf40nSpY#x_IHIYBTiG-fUloTY_M5jA",
},
{
  title: "Darrell Jones",
  tag: "SFW",
  img: "/img/darrelljones.png",
  link: "https://mega.nz/folder/ZPQExaKI#DsNmBqxUIHcROttCWcjZKA",
},
{
  title: "Daviddieal",
  tag: "SFW",
  img: "/img/daviddieal.png",
  link: "https://mega.nz/folder/YKJGAShb#muvdmW8AykAl-2KbXmvURQ",
},
{
  title: "Deacon Voss",
  tag: "SFW",
  img: "/img/deaconvoss.png",
  link: "https://mega.nz/folder/ofYiSIjb#grvDavApVw9059nVw2nwxw",
},
{
  title: "Derbforprez",
  tag: "SFW",
  img: "/img/derbforprez.png",
  link: "https://mega.nz/folder/0PpTUCQZ#g2NgHtwbXimh06KILP4dkQ",
},
{
  title: "Dima",
  tag: "SFW",
  img: "/img/dima.png",
  link: "https://mega.nz/folder/NTxDwa5D#6AHG3SVXhLNAWndl8SHBaA",
},
{
  title: "Dominic Jjuliano",
  tag: "SFW",
  img: "/img/dominicjjuliano.png",
  link: "https://mega.nz/folder/oaY0xJYB#3_Pa0Aegq2ufTfItBkYAjA",
},
{
  title: "Ethan Durant",
  tag: "SFW",
  img: "/img/ethan durant.png",
  link: "https://mega.nz/folder/lTpCSIDZ#7DRMjF34lhlZWWAQSBcLRw",
},
{
  title: "Evan Lamicella",
  tag: "INCLUDES NSFW",
  img: "/img/evan lamicella.png",
  link: "https://mega.nz/folder/4LAG1bCQ#2vk6quh2fAPBX8TigF8h6Q",
},
{
  title: "FormMeetsFunction",
  tag: "SFW",
  img: "/img/formmeetsfunction.png",
  link: "https://mega.nz/folder/NTZECBqT#t8FDnmfIGizQRkKFHgZFtw",
},
{
  title: "Gabriel Coimbra",
  tag: "INCLUDES NSFW",
  img: "/img/GabrielCoimbra.png",
  link: "https://mega.nz/folder/FfpDDYRB#TlL03DRiMTnSesgjEF0VqQ",
},
{
  title: "Germanv10",
  tag: "SFW",
  img: "/img/germanv10.png",
  link: "https://mega.nz/folder/VDx21AAT#I1ZIMkg1V-z7UwYerv3OlA",
},
{
  title: "God Adonis",
  tag: "INCLUDES NSFW",
  img: "/img/godadonis.png",
  link: "https://mega.nz/folder/AK4SSSaD#8A3_MHk-xOzEPDyLFZvyoA",
},
{
  title: "Hatts.17",
  tag: "SFW",
  img: "/img/hatts.17.png",
  link: "https://mega.nz/folder/FOQkkAjR#ZnZmoKewyByjWFS5ohlwkw",
},
{
  title: "Hiphophendrix",
  tag: "SFW",
  img: "/img/hiphophendrix.png",
  link: "https://mega.nz/folder/xDwHAQRY#9OwYepXy6xHksTL9bqzIqQ",
},
{
  title: "Hunterfitt",
  tag: "SFW",
  img: "/img/hunterfitt.png",
  link: "https://mega.nz/folder/ZKI03L5Y#1GP5JEqWQ3m_xG1w33c5TQ",
},
{
  title: "Ian Bentzinger",
  tag: "SFW",
  img: "/img/ianbentzinger.png",
  link: "https://mega.nz/folder/oKgCVDqS#9Z52Ncrni5XX3irEeWy6Bg",
},
{
  title: "ItsDanteCook",
  tag: "SFW",
  img: "/img/itsdantecook.png",
  link: "https://mega.nz/folder/4G4RjSYL#oR_E9GRnVFBlzLwNf36s-Q",
},
{
  title: "ItsZabau",
  tag: "INCLUDES NSFW",
  img: "/img/itszabau.png",
  link: "https://mega.nz/folder/sapXQI5T#HoHxS4Eo5fGEBlhR5L1fuw",
},
{
  title: "Ivan Cidrian",
  tag: "SFW",
  img: "/img/ivan cidrian.png",
  link: "https://mega.nz/folder/gPZRERDS#QJDMTPqQpX1eiTJX_XFg7w",
},
{
  title: "Izaiah Rodriguez",
  tag: "SFW",
  img: "/img/izaiahrodriguez.png",
  link: "https://mega.nz/folder/oKBg1CRT#1r5wygc2Ql_G7Fzn262GTQ",
},
{
  title: "Jacob Day",
  tag: "SFW",
  img: "/img/jacobday.png",
  link: "https://mega.nz/folder/hW5FjAxL#CoNy-qQFqz2sRDdxx4WozQ",
},
{
  title: "Jake Cookee",
  tag: "SFW",
  img: "/img/jakecookee.png",
  link: "https://mega.nz/folder/wfpz2CBC#bF9Rka7GGr1hkF-7uf6fTA",
},
{
  title: "Jake Preston",
  tag: "INCLUDES NSFW",
  img: "/img/Jake Preston.png",
  link: "https://mega.nz/folder/VD5WQRoS#pVk25XKueeFOmbmtUoqMbA",
},
{
  title: "Jake Richard",
  tag: "INCLUDES NSFW",
  img: "/img/jakerichard.png",
  link: "https://mega.nz/folder/FfRBUCyC#jaP4eOwyqAK_wWdMVbd9yA",
},
{
  title: "Jakipz",
  tag: "INCLUDES NSFW",
  img: "/img/jakipz.png",
  link: "https://mega.nz/folder/YPgUQL5Q#eP0X_4ufXIXiX-M9uKs7eA",
},
{
  title: "Jasonfse",
  tag: "SFW",
  img: "/img/jasonfse.png",
  link: "https://mega.nz/folder/oPoXUKYA#4VpS_TIn6M2JyTcYKXn4zg",
},
{
  title: "Joel Erdmann",
  tag: "SFW",
  img: "/img/joelerdmann.png",
  link: "https://mega.nz/folder/pLhDQT6a#h-hcvCqjVEipx45DZ20qbw",
},
{
  title: "Joesworldd",
  tag: "INCLUDES NSFW",
  img: "/img/joesworldd.png",
  link: "https://mega.nz/folder/gDZQnRwA#CSnHF0T94oFw7aPoSgrF8w",
},
{
  title: "Jonah David",
  tag: "SFW",
  img: "/img/jonahdavid.png",
  link: "https://mega.nz/folder/NPAEjBgA#rzX6mzeZkDACAPpWFJgt8w",
},
{
  title: "Jordan Huxhold",
  tag: "SFW",
  img: "/img/jordanhuxhold.png",
  link: "https://mega.nz/folder/1aYj0I7D#rFFyKD9KXzXg6D3N2mxwGA",
},
{
  title: "Jordan Torres",
  tag: "INCLUDES NSFW",
  img: "/img/jordantorres.png",
  link: "https://mega.nz/folder/8XIBnJwK#8bx_vnxb_sbUdl_WKmHaAQ",
},
{
  title: "Jordanxbrandt",
  tag: "INCLUDES NSFW",
  img: "/img/jordanxbrandt.png",
  link: "https://mega.nz/folder/NDQAxB4A#MoX2Sli7ZVDojqkZVsvPaQ",
},
{
  title: "Jorian Hedges",
  tag: "SFW",
  img: "/img/jorianhedges.png",
  link: "https://mega.nz/folder/YLA0SAoR#TzD11mMnXg-2Ssm8_dtPmQ",
},
{
  title: "Josh Loz",
  tag: "INCLUDES NSFW",
  img: "/img/joshloz.png",
  link: "https://mega.nz/folder/UK5AECjT#4u9tQICicPeRGkMJc45pFg",
},
{
  title: "Kylexbrandt",
  tag: "INCLUDES NSFW",
  img: "/img/kylexbrandt.png",
  link: "https://mega.nz/folder/oboywLjA#ZPC5XLo3fwP0CktKJG2RrA",
},
{
  title: "Lucas Bergvall",
  tag: "SFW",
  img: "/img/lucasbergvall.png",
  link: "https://mega.nz/folder/MDAyEZLT#ygiEmhABNFpq9YsUvToa1w",
},
{
  title: "Lucky Logan Playz",
  tag: "INCLUDES NSFW",
  img: "/img/luckyloganplayz.png",
  link: "https://mega.nz/folder/dKRBzb6D#GBcjF6eUe9RYGxJqBhuXbw",
},
{
  title: "Malik Delgaty",
  tag: "INCLUDES NSFW",
  img: "/img/malik delgaty.png",
  link: "https://mega.nz/folder/0fhB1BhQ#pCOmqAxRZFze_srBKXB5fQ",
},
{
  title: "Mauro x Andress",
  tag: "INCLUDES NSFW",
  img: "/img/mauroxandress.png",
  link: "https://mega.nz/folder/5epWDSSK#j4KLUJDRPrI6NmmBoQ0wjA",
},
{
  title: "MaxedNate",
  tag: "INCLUDES NSFW",
  img: "/img/maxednate.png",
  link: "https://mega.nz/folder/pDhD3YZA#yNpydyw9QBavM-ZD__BN0A",
},
{
  title: "MoicestMike",
  tag: "SFW",
  img: "/img/moicestmike.png",
  link: "https://mega.nz/folder/5bojkIpK#k3ITiRegi5UzlZBx0sGRdg",
},
{
  title: "Popeyoso",
  tag: "INCLUDES NSFW",
  img: "/img/popeyoso.png",
  link: "https://mega.nz/folder/5DoT3bbT#3aStYY-Yx1nvdQnBkHJSWg",
},
{
  title: "Rafael Alencar",
  tag: "INCLUDES NSFW",
  img: "/img/Rafael Alencar.png",
  link: "https://mega.nz/folder/9LRDjCwR#eQ5s2o4JvmJNpqMWVv7pHg",
},
{
  title: "Reno Gold",
  tag: "INCLUDES NSFW",
  img: "/img/renogold.png",
  link: "https://mega.nz/folder/Vbw3UZjK#dBIKWAmaXDrW51BijDLR6A",
},
{
  title: "Troyxbrandt",
  tag: "INCLUDES NSFW",
  img: "/img/troyxbrandt.png",
  link: "https://mega.nz/folder/wfgzUTBJ#h7eAxUE6mxrxv4C68sIuow",
},
{
  title: "William Seed",
  tag: "INCLUDES NSFW",
  img: "/img/williamseed.png",
  link: "https://mega.nz/folder/BbAyXKya#qYbbx4yeU7CKb05D4ioIZA",
},
{
  title: "YesBrawn",
  tag: "INCLUDES NSFW",
  img: "/img/yesbrawn.png",
  link: "https://mega.nz/folder/VKZXSZQb#Kq0xW7TgSivAS_vQrb9iLw",
},

  
];

export default function Packs() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [showTopButton, setShowTopButton] = useState(false);

  const copyLink = async (pack: (typeof scenepacks)[number]) => {
    const slug = pack.title.toLowerCase().replace(/\s+/g, "-");
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/packs#${slug}`);
    } catch {
      window.prompt("Copy link:", `${window.location.origin}/packs#${slug}`);
    }
  };
useEffect(() => {
  const handleScroll = () => {
    setShowTopButton(window.scrollY > 300);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const target = document.getElementById(hash);
  if (!target) return;

  setTimeout(() => {
    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 100);
}, []);
  const filteredPacks = useMemo(() => {
    return [...scenepacks]
      .reverse()
      .filter((pack) => {
        const matchesSearch = pack.title.toLowerCase().includes(search.toLowerCase());

        if (filter === "SFW") {
          return matchesSearch && pack.tag === "SFW";
        }

        if (filter === "NSFW") {
          return matchesSearch && pack.tag === "INCLUDES NSFW";
        }

        return matchesSearch;
      });
  }, [search, filter]);

  const latestPack = scenepacks[scenepacks.length - 1];

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
            <a className="text-pink-200" href="/packs">
              Scenepacks
            </a>
            <a className="hover:text-pink-200 transition" href="/gifs">
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
              Scenepack vault
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              High-Quality Scenepacks
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/60">
              Browse premium scenepacks from top creators. Carefully curated collections for professional editing and content creation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://discord.gg/h3FTcW3usW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-2xl bg-pink-200 px-6 py-4 text-sm font-black text-black shadow-[0_0_30px_rgba(255,192,203,.25)] transition hover:bg-pink-100 hover:shadow-[0_0_40px_rgba(255,192,203,.35)]"
              >
                Join Discord
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
                  Latest addition
                </p>
                <h2 className="mt-4 text-3xl font-black text-white">{latestPack.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {latestPack.tag === "SFW" ? "High-quality SFW scenepack" : "Premium NSFW content"}
                </p>
                <button
  onClick={() => {
    const id = latestPack.title.toLowerCase().replace(/\s+/g, "-");
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }}
  className="..."
>
  View Pack
</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 bg-[#05060b]/95 pb-4 backdrop-blur-xl px-4 sm:px-6 pt-4 shadow-lg shadow-pink-500/5">
        <div className="mt-4 grid gap-3 md:grid-cols-[1.3fr_1fr_0.8fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0e1220]/95 px-4 py-4 shadow-lg shadow-pink-500/10">
            <label className="text-xs uppercase tracking-[0.35em] text-white/40">
              Search scenepacks
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scenepacks..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070f] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-pink-300 focus:bg-[#0a0d1a] focus:shadow-lg focus:shadow-pink-500/30 transition"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 rounded-[1.75rem] border border-white/10 bg-[#0e1220]/95 px-4 py-4 shadow-lg shadow-pink-500/10">
            {[
              ["ALL", "All"],
              ["SFW", "SFW"],
              ["NSFW", "NSFW+"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  filter === value
                    ? "bg-pink-200 text-black"
                    : "border border-white/10 bg-white/5 text-white/70 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="rounded-3xl border border-pink-300/20 bg-pink-300/10 px-4 py-3 text-sm text-white/90 shadow-lg shadow-pink-500/15">
            <p className="font-semibold">{filteredPacks.length} visible</p>
            <p className="mt-1 text-white/60">Searchable packs</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20 pt-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-black text-white">All Scenepacks</h2>
              <p className="mt-2 text-sm text-white/50">
                {filteredPacks.length} pack{filteredPacks.length === 1 ? "" : "s"} available.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredPacks.map((pack) => (
              <div
                key={pack.title}
                id={pack.title.toLowerCase().replace(/\s+/g, "-")}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f1220] shadow-2xl shadow-pink-500/15 transition duration-300 hover:-translate-y-1 hover:border-pink-300/40 hover:shadow-pink-500/30"
              >
                <div className="relative aspect-square overflow-hidden bg-black/40">
                  <img
                    src={pack.img}
                    alt={pack.title}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full border border-pink-300/30 bg-pink-300/10 px-3 py-1 text-xs font-bold text-pink-200 backdrop-blur-md">
                      {pack.tag === "INCLUDES NSFW" ? "NSFW+" : pack.tag}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-5 p-5">

                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-xl font-black line-clamp-2">
                      {pack.title}
                    </h3>

                  </div>



                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => copyLink(pack)}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 transition hover:text-white"
                    >
                      Copy Link
                    </button>
                    <a
                      href={pack.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-pink-200 px-3 py-2 text-center text-xs font-black text-black transition hover:bg-pink-100"
                    >
                      Download Pack
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showTopButton && (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="fixed bottom-6 right-6 z-50 rounded-full bg-pink-200 px-5 py-3 text-sm font-bold text-black shadow-[0_12px_30px_rgba(236,72,153,0.25)] transition hover:bg-pink-100 hover:shadow-[0_16px_40px_rgba(236,72,153,0.35)]"
  >
    Go to top
  </button>
)}
    </main>
  );
}