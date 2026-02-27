import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled || !isHome
        ? "bg-void/90 backdrop-blur-md border-b border-gold-faint/30"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            className="font-ritual text-gold text-sm lg:text-base tracking-[0.3em] uppercase text-glow hover:opacity-80 transition-opacity duration-500"
          >
            Heptagram
          </Link>
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {isHome ? (
              <a
                href={`#collection`}
                className="font-altar text-[11px] tracking-[0.25em] uppercase text-parchment/70 hover:text-gold transition-colors duration-500 relative group"
              >
                Collection
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold/40 group-hover:w-full transition-all duration-500" />
              </a>
            ) : (
              <Link
                to="/"
                className="font-altar text-[11px] tracking-[0.25em] uppercase text-parchment/70 hover:text-gold transition-colors duration-500 relative group"
              >
                Collection
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold/40 group-hover:w-full transition-all duration-500" />
              </Link>
            )}
          </div>
          <Link
            to="/cart"
            className="font-altar text-[11px] tracking-[0.25em] uppercase text-parchment/70 hover:text-gold transition-colors duration-500"
          >
            Cart (0)
          </Link>
        </div>
      </div>
    </nav>
  );
}
