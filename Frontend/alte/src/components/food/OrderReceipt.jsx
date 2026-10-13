import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Printer,
  ReceiptText,
  Utensils,
  XCircle,
} from "lucide-react";

import {getOrder} from "../../services/orderApi";

const FALLBACK_IMAGE = "/images/hero.jpg";

function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}

function formatDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function getStatusDetails(status) {
  switch (String(status).toLowerCase()) {
    case "paid":
      return {
        label: "Paid",
        message: "Your payment has been recorded.",
        icon: CheckCircle2,
        className: "bg-green-100 text-green-800",
      };

    case "cancelled":
      return {
        label: "Cancelled",
        message: "This order has been cancelled.",
        icon: XCircle,
        className: "bg-red-100 text-red-800",
      };

    default:
      return {
        label: "Pending",
        message: "Your order is awaiting its next update.",
        icon: Clock3,
        className: "bg-[#E6B84A]/25 text-[#74520A]",
      };
  }
}

function getItemImage(item) {
  if (item.image_url) return item.image_url;
  if (item.image) return item.image;
  if (item.image_path) return item.image_path;

  const slug = (item.name || "food")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `/images/${slug}.jpg`;
}

function OrderReceipt() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    let ignore = false;

    async function loadOrder() {
      try {
        setLoading(true);
        setError(null);

        const data = await getOrder(orderId);

        if (!ignore) {
          setOrder(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err?.message ||
              "We couldn't load this order. Please try again."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadOrder();

    return () => {
      ignore = true;
    };
  }, [orderId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F2E5] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl animate-pulse space-y-5">
          <div className="h-5 w-32 rounded bg-[#245C3A]/10" />
          <div className="h-12 w-64 rounded bg-[#245C3A]/10" />
          <div className="h-72 rounded-3xl bg-[#FFFDF8]" />
          <div className="h-56 rounded-3xl bg-[#FFFDF8]" />
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F8F2E5] px-5 py-16">
        <section className="w-full max-w-lg rounded-3xl bg-[#FFFDF8] p-8 text-center shadow-sm">
          <ReceiptText
            size={36}
            className="mx-auto mb-5 text-[#245C3A]"
          />

          <h1 className="font-display text-3xl font-bold text-[#20251F]">
            Receipt unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#20251F]/65" role="alert">
            {error || "We couldn't find this order."}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-[#245C3A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#19452B]"
            >
              Try again
            </button>

            <Link
              to="/orders"
              className="rounded-full border border-[#245C3A]/20 px-5 py-3 text-sm font-semibold text-[#245C3A]"
            >
              Order history
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const status = getStatusDetails(order.status);
  const StatusIcon = status.icon;
  const items = order.items ?? [];

  return (
    <main className="min-h-screen bg-[#F8F2E5] px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#245C3A] hover:underline hover:underline-offset-4"
        >
          <ArrowLeft size={17} />
          Back to menu
        </Link>

        <header className="mb-8 mt-8 text-center sm:mb-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E6B84A]/30 text-[#245C3A]">
            <ReceiptText size={30} />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#4F7D50]">
            A little goodness, confirmed
          </p>

          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#20251F] sm:text-5xl">
            Your order receipt<span className="text-[#E6B84A]">.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#20251F]/65">
            Thanks for choosing Alte. Here's a record of the order you placed.
          </p>
        </header>

        <section className="overflow-hidden rounded-[1.75rem] border border-[#245C3A]/10 bg-[#FFFDF8] shadow-sm">
          <div className="bg-[#245C3A] px-5 py-6 text-white sm:px-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                  Order reference
                </p>

                <p className="mt-2 break-all font-mono text-sm font-semibold sm:text-base">
                  {order.id}
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${status.className}`}
              >
                <StatusIcon size={15} />
                {status.label}
              </span>
            </div>

            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="text-xs text-white/65">Order date</p>
              <p className="mt-1 text-sm font-medium">
                {formatDate(order.created_at)}
              </p>
              <p className="mt-3 text-xs leading-5 text-white/75">
                {status.message}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Utensils size={20} className="text-[#4F7D50]" />
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#20251F]">
                What you ordered
              </h2>
            </div>

            {items.length === 0 ? (
              <p className="rounded-2xl bg-[#F8F2E5] p-5 text-sm text-[#20251F]/65">
                No order items were returned for this receipt.
              </p>
            ) : (
              <div className="divide-y divide-[#245C3A]/10">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <img
                      src={
                        imageErrors[item.id]
                          ? FALLBACK_IMAGE
                          : getItemImage(item)
                      }
                      alt={item.name}
                      loading="lazy"
                      onError={() =>
                        setImageErrors((previous) => ({
                          ...previous,
                          [item.id]: true,
                        }))
                      }
                      className="h-20 w-20 shrink-0 rounded-2xl bg-[#F8F2E5] object-cover sm:h-24 sm:w-24"
                    />

                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#20251F]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#20251F]/60">
                        {item.quantity} × {formatNaira(item.unit_price)}
                      </p>
                    </div>

                    <p className="self-center text-right text-sm font-bold text-[#245C3A]">
                      {formatNaira(item.subtotal)}
                    </p>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-7 border-t border-dashed border-[#245C3A]/20 pt-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-[#20251F]">
                  Order total
                </span>

                <span className="font-['Playfair_Display'] text-2xl font-bold text-[#245C3A]">
                  {formatNaira(order.total_price)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#20251F]/55">
                Keep this receipt for your records. Your order reference can help you identify this order when contacting Alte.
              </p>
            </div>
          </div>

          <div className="border-t border-[#245C3A]/10 bg-[#F8F2E5]/60 p-5 sm:px-8 sm:py-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#245C3A]/20 bg-[#FFFDF8] px-5 py-3 text-sm font-semibold text-[#245C3A] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A]"
              >
                <Printer size={17} />
                Print receipt
              </button>

              <Link
                to="/orderhistory"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#E6B84A] px-5 py-3 text-sm font-bold text-[#20251F] transition hover:bg-[#d9a936] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A]"
              >
                Order history
                <ArrowRight size={17} />
              </Link>
            </div>

            <Link
              to="/menu"
              className="mt-5 block text-center text-sm font-semibold text-[#245C3A] hover:underline hover:underline-offset-4"
            >
              Fancy something else? Explore the menu
            </Link>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-[#20251F]/50">
          Made for good moments. Made with Alte.
        </p>
      </div>

      <style>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          main,
          main * {
            visibility: visible;
          }

          main {
            min-height: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          main > div {
            max-width: none !important;
          }

          main > div > a,
          main header,
          main section > div:last-child,
          main > div > p {
            display: none !important;
          }

          main section {
            border: 1px solid #ddd !important;
            box-shadow: none !important;
          }

          main section > div {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </main>
  );
}

export default OrderReceipt;