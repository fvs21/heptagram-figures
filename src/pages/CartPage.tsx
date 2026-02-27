import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { featuredFigures } from "../data/figures";
import Heptagram from "../components/Heptagram";

const initialCart = [
  { figure: featuredFigures[0], quantity: 1 },
  { figure: featuredFigures[2], quantity: 2 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.figure.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.figure.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.figure.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.figure.price * item.quantity,
    0
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "HEPTAGRAM10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="fixed top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none">
        <Heptagram size={800} strokeWidth={0.6} />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-12">
          <h1 className="font-ritual text-2xl sm:text-3xl lg:text-4xl text-bone tracking-[0.1em] uppercase">
            Your <span className="text-gold text-glow">Cart</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-body text-lg text-parchment/40 italic mt-8">
              Your cart stands empty, awaiting consecration.
            </p>
            <Link
              to="/"
              className="inline-block mt-8 font-altar text-[11px] tracking-[0.3em] uppercase text-gold border border-gold/30 hover:border-gold/60 px-8 py-3 rounded-xl hover:bg-gold/5 transition-all duration-500"
            >
              Browse the Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="hidden sm:grid sm:grid-cols-[1fr_120px_100px_40px] gap-4 pb-4 border-b border-ash/30 mb-2">
                <span className="font-altar text-[9px] tracking-[0.35em] uppercase text-parchment/30">
                  Artifact
                </span>
                <span className="font-altar text-[9px] tracking-[0.35em] uppercase text-parchment/30 text-center">
                  Quantity
                </span>
                <span className="font-altar text-[9px] tracking-[0.35em] uppercase text-parchment/30 text-right">
                  Total
                </span>
                <span />
              </div>

              <div className="space-y-0">
                {cartItems.map((item) => (
                  <div
                    key={item.figure.id}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_120px_100px_40px] gap-4 sm:gap-4 items-center py-6 border-b border-ash/20"
                  >
                    <Link
                      to={`/product/${item.figure.id}`}
                      className="flex items-center gap-5 group"
                    >
                      <div className="relative w-20 h-24 flex-shrink-0 bg-charcoal rounded-xl overflow-hidden">
                        <img
                          src={item.figure.images[0]}
                          alt={item.figure.name}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] rounded-xl" />
                      </div>
                      <div>
                        <h3 className="font-altar text-sm tracking-[0.12em] uppercase text-bone group-hover:text-gold transition-colors duration-500">
                          {item.figure.name}
                        </h3>
                        <p className="font-body text-xs text-parchment/35 italic mt-0.5">
                          {item.figure.subtitle}
                        </p>
                        <span className="font-altar text-xs tracking-[0.08em] text-gold-dim mt-1 block">
                          ${item.figure.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>

                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-ash/40 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.figure.id, item.quantity - 1)
                          }
                          className="px-3 py-1.5 font-altar text-xs text-parchment/50 hover:text-gold hover:bg-ash/20 transition-all duration-300"
                        >
                          -
                        </button>
                        <span className="px-3 py-1.5 font-altar text-xs text-bone min-w-[32px] text-center border-x border-ash/30">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.figure.id, item.quantity + 1)
                          }
                          className="px-3 py-1.5 font-altar text-xs text-parchment/50 hover:text-gold hover:bg-ash/20 transition-all duration-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-altar text-sm tracking-[0.08em] text-bone">
                        ${(item.figure.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => removeItem(item.figure.id)}
                        className="text-parchment/20 hover:text-crimson transition-colors duration-400 p-1"
                        title="Remove"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1" />
                          <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 font-altar text-[10px] tracking-[0.25em] uppercase text-parchment/40 hover:text-gold transition-colors duration-500"
                >
                  {"< "}
                  Continue Browsing
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border border-ash/30 rounded-2xl p-6 lg:p-8 bg-charcoal/20">
                <h2 className="font-altar text-xs tracking-[0.3em] uppercase text-parchment/50 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-parchment/40">
                      Subtotal
                    </span>
                    <span className="font-altar text-sm tracking-[0.05em] text-bone">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-gold-dim italic">
                        Discount (10%)
                      </span>
                      <span className="font-altar text-sm tracking-[0.05em] text-gold-dim">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="font-body text-sm text-parchment/40">
                      Shipping
                    </span>
                    <span className="font-body text-sm text-parchment/40 italic">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className="golden-line w-full my-5" />

                <div className="flex justify-between mb-8">
                  <span className="font-altar text-sm tracking-[0.15em] uppercase text-bone">
                    Total
                  </span>
                  <span className="font-altar text-lg tracking-[0.08em] text-gold text-glow">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="mb-6">
                  <label className="font-altar text-[9px] tracking-[0.3em] uppercase text-parchment/30 block mb-2">
                    Promo Code
                  </label>
                  <div className="flex min-w-0">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoError(false);
                      }}
                      placeholder="Enter code"
                      disabled={promoApplied}
                      className="flex-1 min-w-0 bg-void/50 border border-ash/40 rounded-l-lg px-4 py-2.5 font-body text-sm text-bone placeholder:text-parchment/20 focus:outline-none focus:border-gold-dim/50 transition-colors duration-500 disabled:opacity-40"
                    />
                    <button
                      onClick={handlePromo}
                      disabled={promoApplied || !promoCode}
                      className="bg-ash/30 border border-ash/40 border-l-0 rounded-r-lg px-4 font-altar text-[9px] tracking-[0.2em] uppercase text-parchment/50 hover:text-gold hover:bg-ash/50 transition-all duration-500 disabled:opacity-30 disabled:hover:text-parchment/50"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="font-body text-xs text-gold-dim italic mt-2">
                      HEPTAGRAM10 applied — 10% off
                    </p>
                  )}
                  {promoError && (
                    <p className="font-body text-xs text-crimson/70 italic mt-2">
                      Invalid code. The sigil was not recognized.
                    </p>
                  )}
                </div>

                <button className="cursor-pointer group relative w-full py-4 rounded-xl overflow-hidden transition-all duration-700 border border-gold/30 hover:border-gold/60">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="relative font-altar text-[11px] tracking-[0.3em] uppercase text-gold">
                    Checkout
                  </span>
                </button>

                <p className="font-body text-[11px] text-parchment/20 text-center italic mt-4">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
