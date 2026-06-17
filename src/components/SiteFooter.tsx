export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-app site-footer__inner">
        <div>
          <p className="brand-mark brand-mark--footer">CVMSCPS</p>
          <p className="text-caption mt-2 max-w-sm">
            Your hub for high-quality scenepacks and creator resources.
          </p>
        </div>
        <div className="site-footer__links">
          <a href="/fvgify-terms-of-service" className="link-subtle">
            Terms of Service
          </a>
          <a href="/privacy-policy" className="link-subtle">
            Privacy Policy
          </a>
          <a href="/admin" className="link-subtle">
            Admin
          </a>
          <p className="text-caption w-full sm:w-auto sm:text-right">© 2026 CVMSCPS</p>
        </div>
      </div>
    </footer>
  );
}
