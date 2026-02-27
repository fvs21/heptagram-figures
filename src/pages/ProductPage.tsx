import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { featuredFigures } from "../data/figures";
import Heptagram from "../components/Heptagram";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const figure = featuredFigures.find((f) => f.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!figure) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <Heptagram size={80} strokeWidth={1} strokeColor="#B8860B" />
        <p className="font-altar text-sm tracking-[0.2em] uppercase text-parchment/50">
          Artifact not found
        </p>
        <Link
          to="/"
          className="font-altar text-[11px] tracking-[0.25em] uppercase text-gold-dim hover:text-gold border-b border-gold-faint/30 hover:border-gold/50 pb-1 transition-all duration-500"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const otherFigures = featuredFigures.filter((f) => f.id !== figure.id).slice(0, 3);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="fixed top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-[0.02] pointer-events-none">
        <Heptagram size={900} strokeWidth={0.6} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[3/4] bg-charcoal rounded-2xl overflow-hidden">
              <img
                src={figure.images[activeImage]}
                alt={figure.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-void/20 pointer-events-none z-[1]" />

              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] pointer-events-none z-[1] rounded-2xl" />
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/20 rounded-tl-lg z-[2]" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/20 rounded-tr-lg z-[2]" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/20 rounded-bl-lg z-[2]" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/20 rounded-br-lg z-[2]" />

              {figure.limited && (
                <div className="absolute top-5 right-5 z-[3]">
                  <span className="font-altar text-[9px] tracking-[0.35em] uppercase text-gold-dim bg-void/80 backdrop-blur-sm px-4 py-2 border border-gold-faint/30 rounded-md">
                    Limited Edition
                  </span>
                </div>
              )}
            </div>

            {figure.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {figure.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square w-20 rounded-xl overflow-hidden border transition-all duration-500 ${activeImage === i
                      ? "border-gold/50 shadow-[0_0_15px_rgba(184,134,11,0.15)]"
                      : "border-ash/30 hover:border-parchment/30 opacity-60 hover:opacity-80"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${figure.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {activeImage === i && (
                      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(184,134,11,0.1)] rounded-xl" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center lg:py-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="golden-line flex-1 max-w-[40px]" />
              <span className="font-altar text-[10px] tracking-[0.4em] uppercase text-gold-dim/70">
                {figure.collection}
              </span>
            </div>

            <h1 className="font-ritual text-3xl sm:text-4xl lg:text-5xl text-bone tracking-[0.1em] uppercase leading-[1.15]">
              {figure.name}
            </h1>

            <p className="font-body text-lg sm:text-xl text-parchment/50 italic mt-3 tracking-wide">
              {figure.subtitle}
            </p>

            <div className="flex items-baseline gap-4 my-8">
              <span className="font-altar text-2xl sm:text-3xl tracking-[0.08em] text-gold text-glow">
                ${figure.price.toFixed(2)}
              </span>
              {figure.limited && (
                <span className="font-body text-sm text-crimson/70 italic">
                  Limited availability
                </span>
              )}
            </div>

            <div className="font-body text-base text-parchment/50 leading-relaxed space-y-4 mb-10">
              <p>
                Hand-crafted with meticulous attention to every sigil and shadow,
                this artifact stands as a testament to devotion. Each piece is
                individually numbered and arrives sealed within a consecrated vessel.
              </p>
              <p>
                Forged from high-density resin with oxidized metal finishes, the
                figure captures an essence that photographs can only approximate.
                To hold it is to understand.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 py-6 border-t border-b border-ash/30">
              {[
                { label: "Material", value: "Resin & Metal" },
                { label: "Height", value: '8.5" / 21.6cm' },
                { label: "Edition", value: figure.limited ? "Limited Run" : "Open Edition" },
                { label: "Collection", value: figure.collection },
              ].map((detail) => (
                <div key={detail.label}>
                  <span className="font-altar text-[9px] tracking-[0.3em] uppercase text-parchment/30 block mb-1">
                    {detail.label}
                  </span>
                  <span className="font-body text-sm text-bone/80">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {figure.soldOut ? (
              <div className="text-center py-5 border border-ash/30 rounded-xl">
                <span className="font-altar text-[11px] tracking-[0.35em] uppercase text-crimson text-glow-crimson">
                  Sold Out
                </span>
                <p className="font-body text-xs text-parchment/30 italic mt-2">
                  Join the waitlist to be notified of restocks
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-ash/40 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 font-altar text-sm text-parchment/50 hover:text-gold hover:bg-ash/20 transition-all duration-300"
                  >
                    -
                  </button>
                  <span className="px-5 py-3 font-altar text-sm text-bone min-w-[50px] text-center border-x border-ash/30">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 font-altar text-sm text-parchment/50 hover:text-gold hover:bg-ash/20 transition-all duration-300"
                  >
                    +
                  </button>
                </div>

                <button className="group relative flex-1 py-4 px-8 rounded-xl overflow-hidden transition-all duration-700 border border-gold/30 hover:border-gold/60">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="relative font-altar text-[11px] tracking-[0.3em] uppercase text-gold group-hover:text-glow transition-all duration-500">
                    Add to Cart
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {otherFigures.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-28">
          <div className="golden-line w-full mb-16" />

          <div className="text-center mb-12">
            <span className="font-altar text-[10px] tracking-[0.4em] uppercase text-gold-dim/60 block mb-3">
              From the Vault
            </span>
            <h2 className="font-ritual text-xl sm:text-2xl text-bone tracking-[0.1em] uppercase">
              Other <span className="text-gold text-glow">Artifacts</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {otherFigures.map((f) => (
              <Link
                key={f.id}
                to={`/product/${f.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] bg-charcoal rounded-2xl overflow-hidden">
                  <img
                    src={f.images[0]}
                    alt={f.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-[1.03] transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-altar text-xs tracking-[0.15em] uppercase text-bone group-hover:text-gold transition-colors duration-500">
                      {f.name}
                    </h3>
                    <p className="font-body text-xs text-parchment/40 italic mt-1">
                      {f.subtitle}
                    </p>
                    <span className="font-altar text-[10px] tracking-[0.1em] text-gold-dim mt-2 block">
                      ${f.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
