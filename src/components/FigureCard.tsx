import { useState } from "react";
import { Link } from "react-router-dom";
import type { Figure } from "../types/figure";

interface FigureCardProps {
  figure: Figure;
  index: number;
}

export default function FigureCard({ figure, index }: FigureCardProps) {
  const [hovered, setHovered] = useState(false);
  const hasAlt = figure.images.length > 1;

  return (
    <Link
      to={`/product/${figure.id}`}
      className="figure-card group cursor-pointer animate-fade-in-up rounded-2xl block"
      style={{ animationDelay: `${200 + index * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-charcoal overflow-hidden rounded-2xl">
        <img
          src={figure.images[0]}
          alt={figure.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${hovered && hasAlt
              ? "opacity-0 scale-[1.02]"
              : "opacity-80 scale-100"
            }`}
          loading="lazy"
        />
        {hasAlt && (
          <img
            src={figure.images[1]}
            alt={`${figure.name} — alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${hovered
                ? "opacity-90 scale-100"
                : "opacity-0 scale-[1.04]"
              }`}
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent z-[1] pointer-events-none" />

        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] z-[1] pointer-events-none rounded-2xl" />

        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/0 group-hover:border-gold/40 transition-all duration-700 z-[3] rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/0 group-hover:border-gold/40 transition-all duration-700 z-[3] rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold/0 group-hover:border-gold/20 transition-all duration-700 z-[3] rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/0 group-hover:border-gold/20 transition-all duration-700 z-[3] rounded-br-lg" />

        {figure.limited && (
          <div className="absolute top-4 right-4 z-[3]">
            <span className="font-altar text-[8px] tracking-[0.35em] uppercase text-gold-dim bg-void/80 backdrop-blur-sm px-3 py-1.5 border border-gold-faint/30 rounded-md">
              Limited
            </span>
          </div>
        )}

        {figure.soldOut && (
          <div className="absolute inset-0 bg-void/60 backdrop-blur-[2px] flex items-center justify-center z-[3] rounded-2xl">
            <span className="font-altar text-[11px] tracking-[0.4em] uppercase text-crimson text-glow-crimson">
              Sold Out
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 z-[2]">
          <span className="font-altar text-[8px] tracking-[0.35em] uppercase text-parchment/40">
            {figure.collection}
          </span>
        </div>
      </div>

      <div className="px-3 pt-5 pb-3">
        <h3 className="font-altar text-sm tracking-[0.15em] uppercase text-bone group-hover:text-gold transition-colors duration-500">
          {figure.name}
        </h3>
        <p className="font-body text-sm text-parchment/40 italic mt-1">
          {figure.subtitle}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-altar text-xs tracking-[0.1em] text-gold-dim">
            ${figure.price.toFixed(2)}
          </span>
          {!figure.soldOut && (
            <span className="font-altar text-[9px] tracking-[0.25em] uppercase text-parchment/30 group-hover:text-gold-dim transition-colors duration-500">
              View &rarr;
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
