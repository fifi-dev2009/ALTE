import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function RestaurantStory() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 md:px-7 md:py-24">
        <div className="grid overflow-hidden rounded-[2rem] bg-green md:grid-cols-[0.85fr_1.15fr] md:rounded-[2.5rem]">
          {/* Story content */}
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 md:px-10 lg:px-16 lg:py-16">
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-yellow sm:text-xs" >  Our story</p>

            <h2 className="mt-4 max-w-md font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] text-soft-white sm:text-5xl lg:text-6xl">
              Food made
              <br />
              with feeling.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-soft-white/70 sm:text-base sm:leading-7">
              Alte is about good food, familiar flavours and the little moments that happen around a table.
            </p>

            <p className="mt-4 max-w-md text-sm leading-6 text-soft-white/70 sm:text-base sm:leading-7">
              Fresh ingredients, bold flavours and dishes made to leave you wanting another bite.
            </p>

            <Link
              to="/about" className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-soft-white underline decoration-soft-white/30 underline-offset-4 transition-colors hover:decoration-soft-white focus:outline-none focus:ring-2 focus:ring-yellow"  >
              Our story
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>

          {/* Image composition */}
          <div className="relative min-h-[360px] sm:min-h-[440px] md:min-h-[520px]">
            <div className="absolute inset-0 overflow-hidden md:rounded-l-[3rem]">
              <img src="/images/interior3.jpg" alt="Interior of our Resturant"  className="h-full w-full object-cover object-center" /> 
            </div>


            {/* Decorative badge */}
            <div className="absolute right-5 top-5 flex h-20 w-20 items-center justify-center rounded-full bg-yellow text-center text-[10px] font-bold leading-[1.15] text-charcoal sm:right-8 sm:top-8 sm:h-24 sm:w-24 sm:text-xs">
              <span> Fresh
                <br />from
                <br />our kitchen
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RestaurantStory;