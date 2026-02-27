import Heptagram from "./Heptagram";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1510_0%,_#0a0a0a_70%)]" />

      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gold"
            style={{ left: `${(i + 1) * (100 / 13)}%` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center animate-slow-spin">
        <Heptagram size={700} strokeWidth={0.8} className="opacity-20" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center animate-slow-spin-reverse">
        <Heptagram
          size={500}
          strokeWidth={0.5}
          variant="lines"
          className="opacity-10"
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(184,134,11,0.08)_0%,_transparent_70%)] animate-breathe" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="font-ritual text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold tracking-[0.15em] uppercase leading-[1.1] text-glow animate-fade-in-up delay-500">
          Heptagram
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-bone/90">
            Figures
          </span>
        </h1>

        <div className="golden-line w-40 mx-auto mt-10 mb-8 animate-reveal-line delay-700" />

        <p className="font-body text-lg sm:text-xl md:text-2xl text-parchment/60 italic tracking-wide max-w-xl mx-auto animate-fade-in-up delay-900">
          Sacred artifacts for the devoted collector
        </p>

        <div className="mt-14 animate-fade-in-up delay-1200">
          <a
            href="#collection"
            className="group inline-flex items-center gap-4 font-altar text-[11px] tracking-[0.3em] uppercase text-gold border border-gold/30 px-10 py-4 hover:bg-gold/5 hover:border-gold/60 transition-all duration-700"
          >
            Enter the Collection
            <svg
              width="20"
              height="10"
              viewBox="0 0 20 10"
              className="text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all duration-500"
            >
              <line
                x1="0"
                y1="5"
                x2="17"
                y2="5"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <line
                x1="14"
                y1="2"
                x2="18"
                y2="5"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <line
                x1="14"
                y1="8"
                x2="18"
                y2="5"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in delay-3000">
        <div className="flex flex-col items-center gap-3">
          <span className="font-altar text-[9px] tracking-[0.4em] uppercase text-parchment/30">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/30 to-transparent animate-float" />
        </div>
      </div>
    </section>
  );
}
