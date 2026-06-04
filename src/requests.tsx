import { useState } from "react";

export default function Requests() {
  const [request, setRequest] = useState("");

  async function sendRequest() {
    if (!request.trim()) {
      alert("Please enter a request.");
      return;
    }

    try {
      await fetch("https://discord.com/api/webhooks/1508531753780777101/YvqckD5P6iJadempHwmNqJgcfveuhJ0wHs6dt41sP-unEfgb7qbXXNEqkbBmHZU5211k", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: "📦 New Scenepack Request",
              description: request,
              color: 16761035,
            },
          ],
        }),
      });

      alert("Request submitted!");
      setRequest("");
    } catch (err) {
      alert("Failed to send request.");
    }
  }

  return (
    <main className="min-h-screen bg-[#05060b] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(236,72,153,.15),transparent_50%),radial-gradient(ellipse_60%_60%_at_20%_50%,rgba(59,130,246,.1),transparent_60%),radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(168,85,247,.05),transparent_50%),linear-gradient(to_bottom,#05060b,#02040c)]" />

      {/* NAV */}
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

            <a className="text-pink-200" href="/requests">
              Requests
            </a>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <section className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-pink-500/15 backdrop-blur-xl">

          <h1 className="text-5xl font-black">
            Request a Scenepack
          </h1>

          <p className="mt-4 text-white/60">
            Submit scenepack requests directly to our Discord server.
          </p>

          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Example: arianfzn gym scenepack..."
            className="mt-8 h-40 w-full rounded-2xl border border-white/10 bg-[#0a0d1a] p-5 text-white outline-none placeholder:text-white/20 focus:border-pink-300 focus:shadow-lg focus:shadow-pink-500/20 transition"
          />

          <button
            onClick={sendRequest}
            className="mt-6 rounded-2xl bg-pink-200 px-8 py-4 font-bold text-black shadow-[0_0_40px_rgba(255,192,203,.35)] hover:bg-pink-100 hover:shadow-[0_0_50px_rgba(255,192,203,.45)] transition"
          >
            Submit Request
          </button>

        </div>
      </section>
    </main>
  );
}