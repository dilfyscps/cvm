import PageBackground from "./components/PageBackground";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function PrivacyPolicy() {
  return (
    <div className="page-shell page-enter text-white">
      <PageBackground />
      <SiteHeader />

      <section className="container-app py-16 sm:py-20">
        <div className="glass-card mx-auto max-w-3xl p-8 sm:p-10">
          <div className="glass-content">
            <p className="text-label">Discord Bot</p>
            <h1 className="text-display mt-3 text-3xl sm:text-4xl">Privacy Policy</h1>
            <p className="text-body mt-4 leading-relaxed">
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

      <SiteFooter />
    </div>
  );
}
