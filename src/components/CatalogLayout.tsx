import type { ReactNode } from "react";
import PageBackground from "./PageBackground";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type CatalogLayoutProps = {
  activeNav: "/packs" | "/gifs";
  badge: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  browsePanel: ReactNode;
  gridHeading: string;
  gridCount: number;
  children: ReactNode;
  showTopButton?: boolean;
};

export default function CatalogLayout({
  activeNav,
  badge,
  title,
  description,
  primaryCta = { href: "https://discord.gg/h3FTcW3usW", label: "Join Discord" },
  browsePanel,
  gridHeading,
  gridCount,
  children,
  showTopButton = false,
}: CatalogLayoutProps) {
  return (
    <div className="page-shell page-enter text-white">
      <PageBackground />
      <SiteHeader active={activeNav} />

      <section className="container-app hero-section">
        <span className="liquid-badge">
          <span className="liquid-badge__dot" />
          {badge}
        </span>
        <h1 className="text-display mt-4 max-w-3xl text-white">{title}</h1>
        <p className="text-body mt-4 max-w-2xl text-lg leading-relaxed">{description}</p>
        <div className="btn-row mt-6">
          <a href={primaryCta.href} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {primaryCta.label}
          </a>
          <a href="/" className="btn-secondary">
            Home
          </a>
        </div>
      </section>

      {browsePanel}

      <section className="container-app pb-20 pt-2 sm:pt-4">
        <h2 className="text-title text-lg text-white sm:text-xl">{gridHeading}</h2>
        <p className="text-caption mt-1">
          {gridCount} pack{gridCount === 1 ? "" : "s"}
        </p>
        <div className="catalog-grid mt-5 sm:mt-6">{children}</div>
      </section>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`scroll-top ${showTopButton ? "scroll-top--visible" : ""}`}
        aria-hidden={!showTopButton}
        tabIndex={showTopButton ? 0 : -1}
      >
        Top
      </button>

      <SiteFooter />
    </div>
  );
}
