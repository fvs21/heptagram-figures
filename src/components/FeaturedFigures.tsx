import { featuredFigures } from "../data/figures";
import FigureCard from "./FigureCard";
import Heptagram from "./Heptagram";

export default function FeaturedFigures() {
  return (
    <section id="collection" className="relative py-28 lg:py-36">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] animate-slow-spin">
        <Heptagram size={1200} strokeWidth={1} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <span className="font-altar text-[10px] tracking-[0.5em] uppercase text-gold-dim/60 block mb-4">
            The Collection
          </span>
          <h2 className="font-ritual text-3xl sm:text-4xl lg:text-5xl text-bone tracking-[0.1em] uppercase">
            Featured
            <span className="text-gold text-glow"> Artifacts</span>
          </h2>
          <div className="golden-line w-24 mx-auto mt-8" />
          <p className="font-body text-base text-parchment/40 italic mt-6 max-w-md mx-auto">
            Each figure is a relic — forged in darkness, consecrated in silence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredFigures.map((figure, i) => (
            <FigureCard key={figure.id} figure={figure} index={i} />
          ))}
        </div>
        <div className="text-center mt-20">
          <a
            href="#"
            className="inline-flex items-center gap-3 font-altar text-[11px] tracking-[0.3em] uppercase text-parchment/50 hover:text-gold border-b border-parchment/10 hover:border-gold/30 pb-2 transition-all duration-500"
          >
            View All Figures
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              className="opacity-50"
            >
              <line x1="0" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="0.5" />
              <line x1="11" y1="1.5" x2="14.5" y2="4" stroke="currentColor" strokeWidth="0.5" />
              <line x1="11" y1="6.5" x2="14.5" y2="4" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
