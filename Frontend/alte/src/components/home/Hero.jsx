import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:px-8 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20 xl:py-24">
        
        {/* Hero content */}
        <div className="max-w-xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow sm:text-xs"> Good food, good moments</p>

          <h1 className="font-display text-4xl font-semibold leading-[0.94] tracking-[-0.04em] text-green sm:text-5xl md:text-[3.5rem] xl:text-[5.2rem] lg:text-[4.5rem] ">
            Food that <br />feels like <br /> <span className="text-charcoal">home.</span>
          </h1>

          <p className="mt-6 max-w-sm text-sm leading-6 text-charcoal/70 sm:mt-7 text-base sm:leading-7"> Bold flavours, fresh ingredients and dishes made to be shared.</p>

            <Link to="/menu"className="group mt-7 inline-flex items-center gap-3 uppercase rounded-xl bg-green px-5 py-3.5 text-xs font-bold tracking-[0.08em] text-soft-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-fresh-green hover:shadow-md active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-cream sm:px-6 animate-[pulse_2s_ease-in-out_1]"
            >   Explore menu  <ArrowRight size={17} strokeWidth={2.2} className="transition-transform duration-200 ease-out group-hover:translate-x-l"/>
            </Link>  
        </div>

        <div className="group relative w-full mx-auto max-w-[620px] lg:ml-auto">
          <div className="relative w-full  overflow-hidden rounded-[1.5rem] border-4 border-green shadow-xl aspect-[4/3] sm:rounded-[2rem] md:aspect-[4/3] lg:aspect-[5/4] lg:rounded-[2.5rem] ">
            <img src="/images/hero.jpg" alt="A freshly prepared dish served at Alte." className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
          </div>

          {/* Small editorial accent */}
          <div className="absolute -bottom-[-8px] right-[-4px] flex h-[72px] w-[72px] items-center justify-center rounded-full bg-yellow px-2 text-center text-[11px] font-bold text-charcoal leading-[1.2] shadow-md transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-2 sm:-bottom-[-10px] sm:right-[-8px] sm:h-24 sm:w-24 sm:text-xs lg:-bottom-[-12px] lg:right-[-12px]" >
            <span>Made <br />fresh <br/> daily ✦ </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;