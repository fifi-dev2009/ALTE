function FoodDoodles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" >
      {/* Jollof bowl — upper left */}
      <svg viewBox="0 0 100 100" fill="none" className="food-float absolute left-3  top-10 h-12 w-12 text-green/70 sm:left-[9%] sm:top-[15%] sm:h-16 sm:w-16 lg:h-20 lg:w-20"
      >
        <path d="M18 48H82L74 69Q50 83 26 69L18 48Z" fill="#E6B84A" fillOpacity=".35" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M23 46Q50 26 77 46Q50 59 23 46Z" fill="#D97935" stroke="currentColor"  strokeWidth="2.5" />
        <path d="M35 43L40 39M50 44L55 39M63 45L67 41" stroke="#F8F2E5" strokeWidth="3" strokeLinecap="round" />
        <path d="M29 58L33 62M44 62L48 65M60 61L64 58"  stroke="currentColor"  strokeWidth="2"   strokeLinecap="round"  />
      </svg>

      {/* Pepper — upper right */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="food-float-slow absolute right-5 top-14 h-10 w-10 -rotate-12 text-fresh-green sm:right-[10%] sm:top-[13%] sm:h-14 sm:w-14 lg:h-[4.5rem] lg:w-[4.5rem]"
      >
        <path
          d="M51 25C43 12 57 9 65 17"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M48 26C34 18 21 31 24 49C27 68 39 81 50 76C58 86 75 75 79 56C83 37 66 24 55 31Z"
          fill="#4F7D50"
          fillOpacity=".18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M48 31Q39 49 50 75M58 32Q68 48 61 72"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Plantain — lower left */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="food-float-delay absolute bottom-9 left-[7%] hidden h-14 w-14 rotate-12 text-yellow sm:block sm:h-16 sm:w-16 lg:bottom-[18%] lg:h-20 lg:w-20"
      >
        <path
          d="M22 22Q19 42 37 61Q53 79 74 65Q81 59 79 51Q62 65 47 53Q31 40 33 22Z"
          fill="#E6B84A"
          fillOpacity=".45"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L31 18M74 65L81 63"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Little sparkle — lower right */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="food-float-slow absolute bottom-12 right-[8%] h-8 w-8 text-yellow sm:bottom-[20%] sm:right-[10%] sm:h-12 sm:w-12"
      >
        <path
          d="M50 10Q54 42 85 50Q54 56 50 90Q45 56 15 50Q45 42 50 10Z"
          fill="currentColor"
          fillOpacity=".65"
        />
        <circle cx="82" cy="18" r="4" fill="#4F7D50" />
      </svg>

      {/* Small decorative dots */}
      <span className="absolute left-[23%] top-[30%] h-2 w-2 rounded-full bg-yellow/60 sm:left-[25%]" />
      <span className="absolute right-[24%] bottom-[27%] h-1.5 w-1.5 rounded-full bg-green/40" />
    </div>
  );
}


export default FoodDoodles;