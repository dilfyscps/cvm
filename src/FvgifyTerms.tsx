import PageBackground from "./components/PageBackground";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function FvgifyTerms() {
  return (
    <div className="page-shell page-enter text-white">
      <PageBackground />
      <SiteHeader />

      <section className="container-app py-16 sm:py-20">
        <div className="glass-card mx-auto max-w-3xl p-8 sm:p-10">
          <div className="glass-content">
            <p className="text-label">Discord Bot</p>
            <h1 className="text-display mt-3 text-3xl sm:text-4xl">Discord Bot Terms of Service</h1>
            <p className="text-body mt-4 leading-relaxed">
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

      <SiteFooter />
    </div>
  );
}
