
// function CartItem({item, onUpdateQuantity, onRemove}) {
//     async function handleDecrease() {
//         if (item.quantity === 1){
//             await onRemove(item.id);
//             return;
//         }

//         await onUpdateQuantity(item.id, item.quantity -1 );
//     }

//     async function handleIcrease() {
//         await onUpdateQuantity(item.id, item.quantity + 1 );
//     }

//     return(
//         <article>
//             <h2>{item.name}</h2>
//             <p>{Number (item.unit_price).toLocaleString()} each</p>
//             <div>
//                 <button onClick={handleDecrease}> - </button>
//                 <span>{item.quantity}</span>
//                 <button onClick={handleIcrease}> + </button>
//             </div>

//             <p>{Number (item.sub_total).toLocaleString()}</p>

//             <button onClick={()=> onRemove(item.id)}>Remove</button>
//         </article>
//     )
// }

// export default CartItem;


import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

const FALLBACK_IMAGE = "/images/hero.jpg";

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

function CartItem({ item, onUpdateQuantity, onRemove, formatPrice }) {
  const [imageSrc, setImageSrc] = useState(() => getItemImage(item));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const price = (amount) =>
    formatPrice ? formatPrice(amount) : `₦${Number(amount || 0).toLocaleString()}`;

  const subtotal = item.subtotal ?? item.sub_total;

  async function runAction(action) {
    if (busy) return;

    try {
      setBusy(true);
      setError(null);
      await action();
    } catch (err) {
      setError(err?.message || "That didn't work. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function handleDecrease() {
    if (item.quantity <= 1) {
      return runAction(() => onRemove(item.id));
    }

    return runAction(() =>
      onUpdateQuantity(item.id, item.quantity - 1)
    );
  }

  function handleIncrease() {
    return runAction(() =>
      onUpdateQuantity(item.id, item.quantity + 1)
    );
  }

  
  return (
    <article className="rounded-[1.5rem] border border-[#245C3A]/10 bg-[#FFFDF8] p-3 shadow-sm transition hover:border-[#245C3A]/20 sm:p-4">
      <div className="flex gap-3 sm:gap-5">
        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#F8F2E5] sm:h-36 sm:w-36">
          <img
            src={imageSrc}
            alt={item.name}
            loading="lazy"
            onError={() => {
              if (imageSrc !== FALLBACK_IMAGE) {
                setImageSrc(FALLBACK_IMAGE);
              }
            }}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="font-['Playfair_Display'] text-lg font-bold leading-snug text-[#20251F] sm:text-xl">
                {item.name}
              </h2>

              <p className="mt-1 text-sm text-[#20251F]/60">
                {price(item.unit_price)}{" "}
                <span className="text-xs">each</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => runAction(() => onRemove(item.id))}
              disabled={busy}
              aria-label={`Remove ${item.name} from cart`}
              title="Remove item"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#20251F]/45 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={17} />
            </button>
          </div>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
            <div
              className="inline-flex items-center rounded-full border border-[#245C3A]/15 bg-[#F8F2E5] p-1"
              aria-label={`Quantity: ${item.quantity}`}
            >
              <button
                type="button"
                onClick={handleDecrease}
                disabled={busy}
                aria-label={`Decrease ${item.name} quantity`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#245C3A] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] disabled:opacity-50"
              >
                <Minus size={15} />
              </button>

              <span
                aria-live="polite"
                className="min-w-8 text-center text-sm font-bold text-[#20251F]"
              >
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                disabled={busy}
                aria-label={`Increase ${item.name} quantity`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#245C3A] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] disabled:opacity-50"
              >
                <Plus size={15} />
              </button>
            </div>

            <p className="text-right font-semibold text-[#245C3A]">
              {price(subtotal)}
            </p>
          </div>
        </div>
      </div>

      {busy && (
        <p className="mt-3 text-xs text-[#4F7D50]" role="status">
          Updating your cart...
        </p>
      )}

      {error && (
        <p className="mt-3 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </article>
  );
}

export default CartItem;