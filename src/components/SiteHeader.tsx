import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/packs", label: "Scenepacks" },
  { href: "/gifs", label: "GIFs" },
  { href: "/requests", label: "Requests" },
  { href: "/admin", label: "Admin" },
] as const;

export default function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (mq.matches) setOpen(false);
    };

    mq.addEventListener("change", closeOnDesktop);
    return () => mq.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="container-app flex min-h-[var(--nav-height)] items-center justify-between gap-4 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <a href="/" className="brand-mark shrink-0 lg:justify-self-start">
          CVMSCPS
        </a>

        <nav
          className="hidden items-center justify-center gap-1 lg:flex lg:justify-self-center"
          aria-label="Main"
        >
          <div className="liquid-pill liquid-pill--nav">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={active === link.href ? "is-active" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="flex justify-end lg:justify-self-end">
          <button
            type="button"
            className={`glass-nav__menu flex shrink-0 lg:hidden ${open ? "is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="glass-nav__backdrop lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
          <nav
            id="mobile-nav"
            className="glass-nav__mobile container-app pb-4 lg:hidden"
            aria-label="Mobile"
          >
            <div className="glass-card p-2">
              <div className="glass-content flex flex-col gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`glass-nav__mobile-link ${active === link.href ? "is-active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
