
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowRight, Heart, Sparkles, Utensils } from "lucide-react";
import FoodDoodles from "../components/food/FoodDoodles";
import CTA from "../components/home/cta";

function About() {
  const values = [
    {
      number: "01",
      icon: Heart,
      title: "Made for good moments",
      description:
        "From a quick lunch to a meal shared with friends, good food has a way of making ordinary moments feel special.",
    },
    {
      number: "02",
      icon: Utensils,
      title: "Flavour comes first",
      description:
        "We're here for satisfying meals, comforting favourites, and the excitement of discovering your next go-to dish.",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "Ordering made easy",
      description:
        "Finding something delicious should feel simple. Browse the menu, choose your favourites, and let the good moments begin.",
    },
  ];

  return (
    <main className="overflow-hidden bg-cream text-charcoal/90 scroll-smooth">
      
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-10">
        <div className="relative mx-auto grid max-w-[1440px] overflow-hidden rounded-[2rem] bg-green/95 lg:min-h-[570px] lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-14 xl:px-20">
            <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-yellow/90 sm:text-sm">  A little about us </p>

            <h1 className="mt-4 max-w-[720px] font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] text-soft-white sm:text-5xl lg:text-6xl">
              More than a meal.<span className="mt-1 block text-yellow">A good moment. </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              We believe good food has a way of bringing people together. That's why finding your next favourite meal should feel just as good as enjoying it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#our-story"
                className="inline-flex items-center gap-2 rounded-full bg-[#E6B84A]/90 px-6 py-3.5 text-sm font-semibold text-charcoal/95 transition hover:bg-[#F0C961] focus:outline-none focus-visible:ring-2 focus-visible:ring-white" >
                Our Story
                <ArrowDownRight size={17} aria-hidden="true" /> </a>
              
            </div>

            
          </div>

          <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-full">
            <img src="/images/fried-rice.jpg" alt="A delicious meal ready to be enjoyed" className="absolute inset-0 h-full w-full object-cover" />

            <div aria-hidden="true"   className="absolute inset-0 bg-gradient-to-t from-[#163B25]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#245C3A]/30 lg:to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/15 p-4 text-white shadow-lg backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8 sm:p-5">
              <p className="font-display text-xl sm:text-2xl">Good food, good moments. </p>
              <p className="mt-1 text-sm text-white/80"> There's always room for one more bite. </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
       <section  id="our-story"   className="mx-auto grid  max-w-[1200px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        
         <div className="relative">
          <div className="overflow-hidden rounded-[1.75rem] ">
            <img  src="/images/cut.jpg" alt="Food prepared for a memorable meal" loading="lazy" className="aspect-[5/4]  w-full object-cover  border border-green transition duration-700 hover:scale-[1.03]"   />
          </div>

          <div className="absolute -bottom-5 -right-2 max-w-[210px] rounded-2xl bg-yellow p-4 shadow-lg ">
            <p className="font-display text-xl font-bold "> Come hungry.</p>
            <p className="mt-1 text-sm text-[#20251F]/80"> Leave room for a good moment.</p>
          </div>
        </div>

        <div className="pt-5 lg:pt-0">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-yellow sm:text-sm"> The idea behind Alte </p>

          <h2 className="max-w-lg font-display text-3xl font-bold  text-green leading-tight sm:text-4xl md:text-5xl"> Life gets better around good food.</h2>

          <div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-[#62675F] sm:text-base sm:leading-8">
            <p>
              Some meals are about convenience. Others become the moments we remember: a favourite dish after a long day, lunch with friends, or that one meal you keep coming back for.
            </p>

            <p>
              Alte is built around that simple idea. We want discovering food and placing an order to feel clear, welcoming, and enjoyable from the first click to the last bite.
            </p>

            <p>
              No complicated journey. Just good food and a little more room for the moments that matter.
            </p>
          </div>

          <Link
            to="/menu"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-[#245C3A] underline decoration-[#E6B84A] decoration-2 underline-offset-4 transition hover:gap-3"
          >
            Find your next favourite
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
    
      </section>

      {/* VALUES */}
      <section className="bg-fresh-green px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-[10px] font-semibold font-sans uppercase tracking-[0.2em] text-yellow sm:text-sm">What matters to us </p>

            <h2 className="font-display text-3xl font-bold leading-tight  text-soft-white sm:text-4xl md:text-5xl"> The little things make the difference. </h2>

            <p className="mt-5 text-[0.5em] leading-7 text-yellow/80 sm:text-base sm:leading-8 italic"> The best food experiences don't need to be complicated. They need to feel right.  </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
            {values.map((value) => { const Icon = value.icon;
              return (
                <article key={value.number} className="group rounded-2xl border border-charcoal/10 bg-[#FFFDF8] p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow/20 hover:shadow-lg sm:p-8" >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm text-yellow">{value.number}</span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0E5] text-[#245C3A] transition group-hover:bg-fresh-green group-hover:text-white">
                      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="mt-8 font-display text-2xl font-bold text-green">{value.title} </h3>

                  <p className="mt-4 text-sm leading-7 text-charcoal/70"> {value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>


      <CTA/>
    </main>
  );
}

export default About;

