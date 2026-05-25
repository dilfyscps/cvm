export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070A12] via-[#0B1220] to-[#0A0F1D] text-white flex flex-col">
      
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <h1 className="text-xl font-bold">CVM</h1>
        <nav className="flex gap-6 text-sm text-white/70">
          <a href="#">Home</a>
          <a href="#">Projects</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center text-center">
        <div>
          <h1 className="text-6xl font-bold">
            Build modern <span className="text-blue-400">experiences</span>
          </h1>
          <p className="mt-6 text-white/60">
            Vite + React homepage ready to customize.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-500 rounded-xl">
              Get Started
            </button>
            <button className="px-6 py-3 border border-white/20 rounded-xl">
              Learn More
            </button>
          </div>
        </div>
      </main>

    </div>
  );
}