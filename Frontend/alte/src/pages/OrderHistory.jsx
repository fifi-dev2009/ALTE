import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ReceiptText,
  ShoppingBag,
  Utensils,
  XCircle,
} from "lucide-react";

import { getOrders } from "../services/orderApi";

function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}

function formatDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getStatusDetails(status) {
  switch (String(status).toLowerCase()) {
    case "paid":
      return {
        label: "Paid",
        icon: CheckCircle2,
        className: "bg-green-100 text-green-800",
      };

    case "cancelled":
      return {
        label: "Cancelled",
        icon: XCircle,
        className: "bg-red-100 text-red-800",
      };

    default:
      return {
        label: "Pending",
        icon: Clock3,
        className: "bg-[#E6B84A]/25 text-[#74520A]",
      };
  }
}

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadOrders() {
      try {
        setLoading(true);
        setError(null);

        const data = await getOrders();

        if (!ignore) {
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err?.message ||
              "We couldn't load your order history. Please try again."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      ignore = true;
    };
  }, [retryCount]);

  return (
    <main className="min-h-screen bg-[#F8F2E5] px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#245C3A] transition hover:text-[#4F7D50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A]"
        >
          <ArrowLeft size={17} />
          Back to profile
        </Link>

        <header className="mb-9 mt-8 sm:mb-12">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6B84A]/30 text-[#245C3A]">
            <ReceiptText size={27} />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#4F7D50]">
            Your Alte moments
          </p>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-4xl font-bold tracking-tight text-[#20251F] sm:text-5xl">
                Order history<span className="text-[#E6B84A]">.</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#20251F]/65 sm:text-base">
                All your good choices, together in one place.
              </p>
            </div>

            {!loading && !error && (
              <span className="rounded-full border border-[#245C3A]/15 bg-[#FFFDF8] px-4 py-2 text-sm font-semibold text-[#245C3A]">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            )}
          </div>
        </header>

        {loading ? (
          <section
            className="space-y-4"
            aria-label="Loading order history"
            aria-busy="true"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-3xl border border-[#245C3A]/10 bg-[#FFFDF8] p-5 sm:p-7"
              >
                <div className="h-4 w-32 rounded bg-[#245C3A]/10" />
                <div className="mt-4 h-6 w-48 rounded bg-[#245C3A]/10" />
                <div className="mt-5 h-4 w-full max-w-sm rounded bg-[#245C3A]/10" />
              </div>
            ))}
          </section>
        ) : error ? (
          <section className="rounded-3xl border border-red-200 bg-[#FFFDF8] px-6 py-10 text-center sm:px-10">
            <ReceiptText
              size={34}
              className="mx-auto mb-4 text-[#245C3A]"
            />

            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#20251F]">
              Your orders aren't loading
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#20251F]/65" role="alert">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-6 rounded-full bg-[#245C3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#19452B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2"
            >
              Try again
            </button>
          </section>
        ) : orders.length === 0 ? (
          <section className="rounded-[2rem] border border-[#245C3A]/10 bg-[#FFFDF8] px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E6B84A]/25 text-[#245C3A]">
              <ShoppingBag size={34} strokeWidth={1.6} />
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#4F7D50]">
              Your next favourite is waiting
            </p>

            <h2 className="font-display text-3xl font-bold text-[#20251F] sm:text-4xl">
              No orders just yet.
            </h2>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#20251F]/65">
              Once you place an order, you'll find its details and receipt right  here. Let's find you something delicious.
            </p>

            <Link
              to="/menu"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#245C3A] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#19452B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2"
            >
              Explore the menu
              <ArrowRight size={17} />
            </Link>
          </section>
        ) : (
          <section aria-label="Your previous orders" className="space-y-5">
            {orders.map((order) => {
              const status = getStatusDetails(order.status);
              const StatusIcon = status.icon;
              const items = order.items ?? [];
              const quantityCount = items.reduce(
                (total, item) => total + Number(item.quantity || 0),
                0
              );

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-[1.75rem] border border-[#245C3A]/10 bg-[#FFFDF8] shadow-sm transition hover:border-[#245C3A]/25 hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 p-5 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4F7D50]">
                          Order reference
                        </p>

                        <p className="mt-2 break-all font-mono text-sm font-semibold text-[#20251F]">
                          {order.id}
                        </p>

                        <p className="mt-3 flex items-center gap-2 text-sm text-[#20251F]/60">
                          <CalendarDays size={16} />
                          {formatDate(order.created_at)}
                        </p>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${status.className}`}
                      >
                        <StatusIcon size={15} />
                        {status.label}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-[#245C3A]/15 pt-5">
                      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#20251F]">
                        <Utensils size={17} className="text-[#4F7D50]" />
                        {quantityCount}{" "}
                        {quantityCount === 1 ? "item" : "items"}
                      </div>

                      {items.length > 0 ? (
                        <ul className="space-y-3">
                          {items.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-start justify-between gap-4 text-sm"
                            >
                              <span className="min-w-0 text-[#20251F]/75">
                                <span className="font-semibold text-[#20251F]">
                                  {item.quantity} x
                                </span>{" "}
                                {item.name}
                              </span>

                              <span className="shrink-0 font-medium text-[#20251F]">
                                {formatNaira(item.subtotal)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-[#20251F]/55">
                          Item details are unavailable for this order.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#245C3A]/10 pt-5">
                      <div>
                        <p className="text-xs text-[#20251F]/55">
                          Order total
                        </p>
                        <p className="mt-1 font-display text-2xl font-bold text-[#245C3A]">
                          {formatNaira(order.total_price)}
                        </p>
                      </div>

                      <Link
                        to={`/orders/${order.id}`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#E6B84A] px-5 py-3 text-sm font-bold text-[#20251F] transition hover:bg-[#d9a936] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2"
                      >
                        View receipt
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        <div className="mt-10 rounded-3xl bg-[#245C3A] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <div>
            <h2 className="font-display text-2xl font-bold">
              Ready for another good meal?
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              There's always something delicious waiting for you.
            </p>
          </div>

          <Link
            to="/menu"
            className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#E6B84A] px-5 py-3 text-sm font-bold text-[#20251F] transition hover:bg-[#d9a936] sm:mt-0"
          >
            Browse menu
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderHistory;