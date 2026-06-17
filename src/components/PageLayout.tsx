import type { ReactNode } from "react";
import PageBackground from "./PageBackground";

export default function PageLayout({
  children,
  showFooter = true,
}: {
  children: ReactNode;
  showFooter?: boolean;
}) {
  return (
    <div className="page-shell page-enter text-white">
      <PageBackground />
      <main>{children}</main>
      {showFooter && (
        <footer className="container-app border-t border-white/[0.06] py-8 text-center text-sm text-white/40">
          <a href="/" className="link-subtle">
            ← Back to CVMSCPS
          </a>
        </footer>
      )}
    </div>
  );
}
