export default function PrivacyPolicy() {
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

            <a className="text-pink-200" href="/privacy-policy">
              Privacy Policy
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-pink-500/15 backdrop-blur-xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-pink-300">Discord Bot</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-white">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
              This privacy policy explains how the FVGnation Discord bot collects, uses, and protects information from users interacting with the bot.
            </p>
          </div>

          <div className="space-y-10 text-white/75">
            <section>
              <h2 className="mb-4 text-2xl font-black text-white">1. Information Collection</h2>
              <p className="leading-8">
                We collect information submitted through the bot, such as commands, messages, and support requests. We may also store your Discord username and user ID to provide bot functionality in the FVGnation server.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">2. Use of Information</h2>
              <p className="leading-8">
                Information is used to respond to commands, process requests, and improve bot performance in the FVGnation server. We do not use your data for targeted advertising.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">3. Data Sharing</h2>
              <p className="leading-8">
                We do not sell your information. Shared data is limited to trusted providers needed to host and operate the bot.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">4. Security</h2>
              <p className="leading-8">
                We take reasonable measures to protect the information you provide and to secure bot interactions against unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">5. Retention</h2>
              <p className="leading-8">
                Data is retained only as long as needed to provide the bot service and support users. Support or request logs may be kept to troubleshoot issues and improve the bot.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-black text-white">6. Contact</h2>
              <p className="leading-8">
                If you have questions about this privacy policy, please contact us through the website or Discord support channels.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
