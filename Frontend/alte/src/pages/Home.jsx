import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Hero from "../components/home/Hero";
import FoodCard from "../components/food/FoodCard";
import RestaurantStory from "../components/home/ResturantStory";
import CTA from "../components/home/cta";
import { getAllMenuItems } from "../services/menuApi";


function Home() {
  const [menuItems, setMenuItems] = useState([]);
  useEffect (()=>{
    async function loadMenuItems() {
      try {
        const items = await getAllMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error(error)
      }
    }

    loadMenuItems();
  }, [])

  const featuredDishes = menuItems.slice(0,3);

  return (
    <>
      <Hero />

      {/* Today's Picks */}
      <section className="bg-soft-white">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
          {/* Section heading */}
          <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow sm:text-xs">
                From our kitchen
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-green sm:text-4xl md:text-5xl">
                Today's Picks
              </h2>
            </div>

            <Link to="/menu" className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-green focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-soft-white sm:inline-flex" >
              View all menu
              <ArrowRight  size={16} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Food cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {featuredDishes.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>

          {/* Mobile view-all */}
          <div className="mt-8 sm:hidden">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green underline decoration-green/30 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-yellow"
            >
              View all menu
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <RestaurantStory />

      <CTA />
    </>
  );
}

export default Home;