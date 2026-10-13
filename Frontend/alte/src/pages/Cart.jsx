import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShoppingBag, Utensils } from "lucide-react";

import { useCart } from "../context/CartContext";
import CartItem from "../components/food/CartItem";
import { placeOrder } from "../services/orderApi";

function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}

function Cart() {
  const {
    cart,
    loading,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const items = cart?.items ?? [];
  const isEmpty = !loading && items.length === 0;

  async function handlePlaceOrder() {
    if (placingOrder || items.length === 0) return;

    try {
      setPlacingOrder(true);
      setError(null);

      const order = await placeOrder();
      navigate(`/orders/${order.id}`);
    } catch (err) {
      setError(
        err?.message || "We couldn't place your order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  async function handleClearCart() {
    try {
      setError(null);
      await clearCart();
    } catch (err) {
      setError(err?.message || "We couldn't clear your cart. Please try again.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-cream px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="mb-8 h-4 w-28 rounded bg-green/10" />
          <div className="mb-3 h-10 w-64 rounded bg-green/10" />
          <div className="mb-10 h-4 w-52 rounded bg-green/10" />

          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div  key={item}  className="h-36 rounded-3xl bg-soft-white"  />
              ))}
            </div>
            <div className="h-72 rounded-3xl bg-soft-white" />
          </div>
        </div>
      </main>
    );
  }

  if (isEmpty) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-cream px-5 py-16">
        <section className="w-full max-w-lg rounded-[2rem] border border-green/10 bg-soft-white px-6 py-12 text-center shadow-sm sm:px-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow/25 text-green">
            <ShoppingBag size={34} strokeWidth={1.6} />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#4F7D50]">
            Room for something delicious
          </p>

          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#20251F] sm:text-4xl">
            Your cart is taking a little break.
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#20251F]/70">
            Your next favourite meal is waiting. Have a look around and find something good.</p>

          <Link
            to="/menu"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#245C3A] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#19452B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2"
          >
            Explore the menu
            <ArrowRight size={17} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F2E5] px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#245C3A] transition hover:text-[#4F7D50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A]"
        >
          <ArrowLeft size={17} />
          Back to menu
        </Link>

        <header className="mb-8 mt-7 sm:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#4F7D50]">
            Almost time to eat
          </p>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-4xl font-bold tracking-tight text-[#20251F] sm:text-5xl">  Your cart<span className="text-[#E6B84A]">.</span> </h1>
              <p className="mt-3 text-sm text-[#20251F]/65 sm:text-base">  Good choices. Let's make them happen. </p>
            </div>

            <span className="rounded-full border border-[#245C3A]/15 bg-[#FFFDF8] px-4 py-2 text-sm font-semibold text-[#245C3A]">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              className="font-semibold underline underline-offset-4"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_350px]">
          <section aria-label="Items in your cart" className="min-w-0">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  formatPrice={formatNaira}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-[#245C3A] hover:underline hover:underline-offset-4"
              >
                <ArrowLeft size={16} />
                Add something else
              </Link>

              <button
                type="button"
                onClick={handleClearCart}
                className="rounded-full px-3 py-2 text-sm font-medium text-[#20251F]/60 transition hover:bg-white/60 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A]"
              >
                Clear cart
              </button>
            </div>
          </section>

          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-[1.75rem] border border-[#245C3A]/10 bg-[#FFFDF8] shadow-sm">
              <div className="bg-[#245C3A] px-6 py-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#E6B84A]">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <h2 className="font-['Playfair_Display'] text-2xl font-bold">  Order summary  </h2>
                    <p className="mt-1 text-xs text-white/70"> A little goodness, all together.  </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-4 text-sm text-[#20251F]/70">
                  <span>Items ({items.length})</span>
                  <span className="font-medium text-[#20251F]">
                    {formatNaira(cart?.total)}
                  </span>
                </div>

                <div className="my-5 border-t border-dashed border-[#245C3A]/20" />

                <div className="flex items-end justify-between gap-4">
                  <span className="font-semibold text-[#20251F]">
                    Total
                  </span>
                  <span className="font-['Playfair_Display'] text-2xl font-bold text-[#245C3A]">
                    {formatNaira(cart?.total)}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-5 text-[#20251F]/55">
                  Your final total is calculated by Alte. Any additional charges will be shown before you confirm your order.
                </p>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={placingOrder || items.length === 0}
                  className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#E6B84A] px-5 py-4 text-sm font-bold text-[#20251F] transition hover:bg-[#d9a936] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {placingOrder ? "Placing your order..." : "Place my order"}
                  {!placingOrder && <ArrowRight size={18} />}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#20251F]/55">
                  Hungry already? We'll keep things simple.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;