import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Check, LoaderCircle, ShoppingCart, X } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const FEEDBACK_DURATION = 3000;

function FoodCard({ item }) {
  const { addToCart } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [isAdding, setIsAdding] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const messageTimerRef = useRef(null);

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(item.price);

  const imagePath = `/images/${item.name.toLowerCase().replaceAll(" ", "-")}.jpg`;

  const isAvailable =item.is_available !== false && item.quantity > 0;

  function showFeedback(nextFeedback) {
  
    if (messageTimerRef.current !== null) {
      clearTimeout(messageTimerRef.current);
    }

    setFeedback(nextFeedback);
    messageTimerRef.current = setTimeout(() => {
      setFeedback(null);
      messageTimerRef.current = null;
    }, FEEDBACK_DURATION);
  }

 
  useEffect(() => {
    return () => {
      if (messageTimerRef.current !== null) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, []);

  async function handleAddToCart() {
    if (authLoading || isAdding) return;

    if (!isAuthenticated) {
      showFeedback({
        type: "auth",
        message: "Sign in to add items to your cart.",
      });
      return;
    }

    if (!isAvailable) {
      showFeedback({
        type: "error",
        message: "Sorry, this item is currently unavailable.",
      });
      return;
    }

    try {
      setIsAdding(true);
      setFeedback(null);

      await addToCart(item.id);

      showFeedback({
        type: "success",
        message: `${item.name} added to your cart.`,
      });
    } catch (error) {
      const backendMessage = error?.message?.toLowerCase() ?? "";
      let message = "We couldn't add this item. Please try again.";

      if (
        backendMessage.includes("stock") ||
        backendMessage.includes("available") ||
        backendMessage.includes("quantity")
      ) {
        message = "Availability may have changed. Please try again.";
      } else if (
        backendMessage.includes("not authenticated") ||
        backendMessage.includes("authentication") ||
        backendMessage.includes("unauthorized")
      ) {
        message = "Your session may have expired. Please sign in again.";
      }

      showFeedback({
        type: "error",
        message,
      });
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-charcoal/10 bg-soft-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Food image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <img src={imagePath} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/45">
            <span className="rounded-full bg-soft-white px-4 py-2 text-sm font-semibold text-charcoal">  Sold out </span>
          </div>
        )}
      </div>

      {/* Food details */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 font-display text-xl font-semibold leading-tight text-green"> {item.name}</h3>

          <p className="shrink-0 text-sm font-bold text-charcoal"> {formattedPrice} </p>
        </div>

        {item.description && (
          <p className="mt-2 max-w-xs text-xs leading-5 text-charcoal/65 sm:text-sm sm:leading-6"> {item.description} </p>
        )}

        {/* Add to cart */}
        <div className="mt-4 flex items-center justify-end">
          <button   type="button" onClick={handleAddToCart} disabled={!isAvailable || isAdding || authLoading} aria-label={`Add ${item.name} to cart`} className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-yellow px-3 text-charcoal transition-all duration-200 hover:scale-105 hover:shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <LoaderCircle size={18} className="animate-spin"  aria-hidden="true" />
                <span className="text-xs font-semibold">Adding…</span>
              </>
            ) : (
              <Plus size={20} strokeWidth={2.5} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Customer-facing feedback */}
        {feedback && (
          <div  key={`${feedback.type}-${feedback.message}`}  role={feedback.type === "error" ? "alert" : "status"} aria-live={feedback.type === "error" ? "assertive" : "polite"} className={`mt-3 rounded-xl p-3 text-sm ${ feedback.type === "success"   ? "bg-green/10 text-green"   : feedback.type === "auth"  ? "bg-yellow/20 text-charcoal"  : "bg-red-50 text-red-800"
            }`}>
            <div className="flex items-start gap-2">
              {feedback.type === "success" && (
                <Check size={18} className="mt-0.5 shrink-0" aria-hidden="true"/>
              )}

              <div className="min-w-0 flex-1">
                <p>{feedback.message}</p>

                {feedback.type === "success" && (
                  <Link to="/cart" className="mt-1 inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-75" >
                    <ShoppingCart size={14} aria-hidden="true" />  View cart
                  </Link>
                )}

                {feedback.type === "auth" && (
                  <Link  to="/login"   className="mt-1 inline-block font-semibold underline underline-offset-2 hover:opacity-75"  >
                    Sign in →
                  </Link>
                )}

                {feedback.type === "error" && (
                  <button type="button" onClick={handleAddToCart}  disabled={isAdding || authLoading} className="mt-1 font-semibold underline underline-offset-2 hover:opacity-75 disabled:opacity-50"  >   Try again
                  </button>
                )}
              </div>
              <button type="button" onClick={() => {  if (messageTimerRef.current !== null){
                clearTimeout(messageTimerRef.current);  messageTimerRef.current = null;
               }
               setFeedback(null);
               }} aria-label="Dismiss message" className="shrink-0 rounded-full p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current">
               <X size={16} aria-hidden="true" />
                </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default FoodCard;