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
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,192,203,.12),transparent_30%),linear-gradient(to_bottom,#090a12,#05060b)]" />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
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
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

          <h1 className="text-5xl font-black">
            Request a Scenepack
          </h1>

          <p className="mt-4 text-white/45">
            Submit scenepack requests directly to our Discord server.
          </p>

          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Example: arianfzn gym scenepack..."
            className="mt-8 h-40 w-full rounded-2xl border border-white/10 bg-black/30 p-5 outline-none placeholder:text-white/20 focus:border-pink-300"
          />

          <button
            onClick={sendRequest}
            className="mt-6 rounded-2xl bg-pink-200 px-8 py-4 font-bold text-black shadow-[0_0_40px_rgba(255,192,203,.35)] hover:bg-pink-100 transition"
          >
            Submit Request
          </button>

        </div>
      </section>
    </main>
  );
}