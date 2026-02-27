import Heptagram from "./Heptagram";

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-12 border-t border-gold-faint/15">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[radial-gradient(ellipse_at_top,_rgba(184,134,11,0.04)_0%,_transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-5">
              <Heptagram size={28} strokeWidth={1.5} strokeColor="#B8860B" />
              <span className="font-ritual text-sm tracking-[0.25em] uppercase text-gold">
                Heptagram
              </span>
            </div>
            <p className="font-body text-sm text-parchment/35 leading-relaxed max-w-xs mx-auto md:mx-0">
              Sacred artifacts for those who seek beyond the veil. Each figure consecrated
              through geometry and devotion.
            </p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-altar text-[10px] tracking-[0.4em] uppercase text-parchment/50 mb-5">
              The Inner Circle
            </h4>
            <p className="font-body text-sm text-parchment/30 mb-5">
              Receive transmissions about new relics and updates.
            </p>
            <div className="flex max-w-xs mx-auto md:ml-auto md:mr-0">
              <input
                type="email"
                placeholder="name@example.com"
                className="flex-1 bg-charcoal/50 border border-smoke/30 px-4 py-2.5 font-body text-sm text-bone placeholder:text-parchment/20 focus:outline-none focus:border-gold-dim/50 transition-colors duration-500"
              />
              <button className="bg-gold-faint/30 border border-gold-faint/30 border-l-0 px-4 font-altar text-[9px] tracking-[0.2em] uppercase text-gold hover:bg-gold-faint/50 transition-colors duration-500">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="golden-line mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-parchment/20">
            &copy; Heptagram Figures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
