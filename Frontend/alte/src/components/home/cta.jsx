import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FoodDoodles from "../food/FoodDoodles";


function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-soft-white">

      <FoodDoodles />

      <svg aria-hidden="true" viewBox="0 0 180 180" className="pointer-events-none absolute -left-8 top-1/2 hidden h-40 w-40 -translate-y-1/2 text-green opacity-15 sm:block lg:left-8 lg:h-48 lg:w-48"fill="none" >
        <path  d="M90 150C90 120 72 110 48 108C25 106 18 90 25 72C33 51 53 45 70 55C88 66 99 82 90 105" stroke="currentColor"strokeWidth="2"strokeLinecap="round"/>

        <path  d="M61 55C55 38 63 25 77 22C91 19 103 28 102 42C101 55 91 63 77 67"  stroke="currentColor" strokeWidth="2"  strokeLinecap="round"  />
        <circle cx="115" cy="58" r="4" fill="currentColor" />
        <circle cx="45" cy="35" r="3" fill="currentColor" />
      </svg>

      <svg aria-hidden="true" viewBox="0 0 180 180" className="pointer-events-none absolute -right-8 top-1/2 hidden h-40 w-40 -translate-y-1/2 rotate-12 text-green opacity-15 sm:block lg:right-8 lg:h-48 lg:w-48" fill="none" >
        <path   d="M90 145C90 119 105 105 130 101C151 98 160 83 154 66C148 49 130 43 115 52C97 63 87 82 94 103" stroke="currentColor"strokeWidth="2" strokeLinecap="round" />
        <path
          d="M116 53C123 38 117 25 104 21C91 17 79 25 79 39C79 52 89 61 102 65" stroke="currentColor" strokeWidth="2"strokeLinecap="round" />
        <circle cx="62" cy="55" r="4" fill="currentColor" />
        <circle cx="135" cy="34" r="3" fill="currentColor" />
      </svg>

      {/* CTA content stays above the illustrations */}
      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-5 py-20 text-center sm:px-6 md:px-8 md:py-28">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow sm:text-xs">
          Come hungry
        </p>

        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] text-green sm:text-5xl md:text-6xl">  Your next favourite <br /> meal is waiting. </h2>

        <p className="mt-5 max-w-md text-sm leading-6 text-charcoal/65 sm:text-base sm:leading-7">
          Pick something delicious and let us take care of the rest.
        </p>

        <Link
          to="/menu" className="group mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl bg-green px-6 py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-soft-white transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-fresh-green hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-soft-white" >
          View full menu
          <ArrowRight size={17} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-1"  />
        </Link>
      </div>
    </section>
  );
}

export default CTA;




