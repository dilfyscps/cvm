export default function FvgifyTerms() {
  return (
    <main className="min-h-screen bg-[#05060b] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(236,72,153,.15),transparent_50%),radial-gradient(ellipse_60%_60%_at_20%_50%,rgba(59,130,246,.1),transparent_60%),radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(168,85,247,.05),transparent_50%),linear-gradient(to_bottom,#05060b,#02040c)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
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

            <a className="hover:text-white" href="/packs">
              Scenepacks
            </a>

            <a className="hover:text-white" href="/requests">
              Requests
            </a>

            <a className="text-pink-200" href="/fvgify-terms-of-service">
              Terms
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-pink-500/15 backdrop-blur-xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-pink-300">Discord Bot</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-white">
              Discord Bot Terms of Service
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
              These terms govern your access to and use of the FVGnation Discord bot. By interacting with the bot, you agree to follow these rules and respect the community standards.
            </p>
          </div>

          <div className="space-y-10 text-white/75">
            <section>
              <h2 className="mb-4 text-2xl font-black text-white">1. Acceptance</h2>
              <p className="leading-8">
                By using the FVGnation Discord bot, you agree to these Terms of Service. If you do not agree with any part of these terms, do not use the bot.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">2. Bot Use</h2>
              <p className="leading-8">
                The bot is provided for community engagement and request submission within the FVGnation Discord server. FVGnation is an independent community server and is not connected to scenepack distribution. Do not use the bot for spam, harassment, abuse, or any actions that violate Discord&apos;s Community Guidelines.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">3. Command Conduct</h2>
              <p className="leading-8">
                Use commands responsibly. Do not attempt to exploit the bot, bypass rate limits, or send malicious content. Any misuse may result in restricted access.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">4. Content Policy</h2>
              <p className="leading-8">
                The bot does not endorse illegal content, hate speech, harassment, or copyrighted material shared without permission. You are responsible for anything you submit through the bot.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">5. Disclaimer</h2>
              <p className="leading-8">
                The bot is provided "as is" and "as available". FVGnation is not responsible for any loss, damage, or disruption resulting from bot use.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">6. Changes</h2>
              <p className="leading-8">
                We may update these terms at any time. Continued use of the bot after changes are posted means you accept the updated terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">7. Contact</h2>
              <p className="leading-8">
                For questions about these terms, contact us through Discord or the website support channels.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
