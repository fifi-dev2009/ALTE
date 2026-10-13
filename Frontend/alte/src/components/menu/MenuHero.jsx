import { Link } from "react-router-dom";

function MenuHero() {
  return (
    <section className="relative mx-4 mt-4 overflow-hidden rounded-3xl sm:mx-6 lg:mx-10">
      <img
        src="/images/spaghetti-bolognese.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20"
        aria-hidden="true"
      />

      <div className="relative flex min-h-[400px] items-end px-5 py-8 sm:min-h-[460px] sm:px-8 sm:py-10 md:min-h-[520px] md:px-12 md:py-14 lg:min-h-[560px] lg:px-16">
        <div className="max-w-2xl text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#E6B84A] sm:text-sm">
            Good food, good moments
          </p>

          <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Something good is waiting.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
            From comforting Nigerian classics to refreshing drinks, find
            something made for your next good moment.
          </p>

          <Link
            to="#menu-heading"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#E6B84A] px-6 py-3 font-semibold text-[#20251F] transition hover:bg-[#F0C961] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245C3A]"
          >
            Explore the dishes
            <span className="ml-2" aria-hidden="true">
              ↓
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MenuHero;