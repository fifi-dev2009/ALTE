// import { useState, useEffect } from "react"
// import FoodCard  from "../components/food/FoodCard";

// import MenuHero from "../components/menu/MenuHero";
// import { getAllMenuItems, getMenus } from "../services/menuApi";

// function Menu() {

//     const [menuItems, setMenuItems] = useState([]);
//     const [menus, setMenus] = useState([]);
//     const [selectedMenuId, setSelectedMenuId] = useState("all");

//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState("");

//     useEffect(()=>{
//         async function loadMenu() {
//             try {
//                 setLoading(true);
//                 setError("");

//                 const[items, menuCategries] = await Promise.all([getAllMenuItems(), getMenus(),]);
//                 setMenuItems(items);
//                 setMenus(menuCategries)

//             }catch(error){
//                 setError(error.message)
//             }finally{
//                 setLoading(false)
//             }
//         }
//         loadMenu()
//     }, []);

//     const filteredItems = selectedMenuId === "all" ? menuItems : menuItems.filter((item)=> item.menu_id === selectedMenuId)

//     return(

//      <>
//         <main className="min-h-screen max-w-[1200px] mx-auto  px-5 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
//              <MenuHero />
            
//             <div className="mb-8 pb-2 mt-5 flex  gap-3 overflow-x-auto ">
               
//                 <button type="button" onClick={() => setSelectedMenuId("all")} className= {`rounded-full whitespace-nowrap px-5 py-2.5 text-sm font-medium transition ${selectedMenuId === "all" ? "bg-green text-white" : " bg-white text-neutral-600 hover:bg-neutral-100"}`}>All</button>

//                 {menus.map((menu)=> (<button key={menu.id } type="button" onClick={()=> setSelectedMenuId(menu.id)} className={`rounded-full whitespace-nowrap px-5 py-2.5 text-sm font-medium transition ${selectedMenuId === menu.id ? "bg-green text-white" : " bg-white text-neutral-600 hover:bg-neutral-100"}`}>{menu.name}</button>))}
                
//             </div>

//             {loading &&(<p className="py-12 text-center teaxt-neutral-500">Loading menu...</p>)}

//             {!loading && error &&(<div className="rounded-2xl bg-red-50 p-6 text-center text-red-700">
//                 <p>{error}</p>
//                 <button type="button" onClick={()=> window.location.reload() } className="mt-3 font-medium underline">Try Again</button>
//                 </div>)}

       
        
//             <div className="mx-auto grid  grid-cols-1 max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">{filteredItems.map((item)=> <FoodCard key={item.id } item={item} />)}</div>
    
//         </main>
//      </>
//     )
    
// }

// export default Menu;


import { useState, useEffect } from "react";
import FoodCard from "../components/food/FoodCard";
import MenuHero from "../components/menu/MenuHero";
import { getAllMenuItems, getMenus } from "../services/menuApi";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadMenu() {
      try {
        setLoading(true);
        setError("");

        const [items, menuCategories] = await Promise.all([
          getAllMenuItems(),
          getMenus(),
        ]);

        if (!isActive) return;

        setMenuItems(items);
        setMenus(menuCategories);
      } catch (err) {
        if (!isActive) return;

        setError(
          err?.message || "We couldn't load the menu. Please try again."
        );
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadMenu();

    return () => {
      isActive = false;
    };
  }, [retryCount]);

  const filteredItems =
    selectedMenuId === "all"
      ? menuItems
      : menuItems.filter(
          (item) => String(item.menu_id) === String(selectedMenuId)
        );

  function handleRetry() {
    setRetryCount((count) => count + 1);
  }

  return (
    <main className="min-h-screen bg-[#F8F2E5] pb-16">
      <MenuHero />

      <section
        className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 md:pt-14 lg:px-10"
        aria-labelledby="menu-heading"
      >
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#4F7D50]">
              Made for your cravings
            </p>

            <h2
              id="menu-heading"
              className="font-display text-3xl font-bold text-[#20251F] sm:text-4xl"
            >
              Explore the menu
            </h2>
          </div>

          {!loading && !error && (
            <p className="text-sm text-[#62675F]" aria-live="polite">
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>

        {/* Category filters */}
        <div
          className="-mx-1 mb-8 flex gap-3 overflow-x-auto px-1 pb-3"
          aria-label="Filter menu by category"
        >
          <button
            type="button"
            aria-pressed={selectedMenuId === "all"}
            onClick={() => setSelectedMenuId("all")}
            className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2 ${
              selectedMenuId === "all"
                ? "bg-[#245C3A] text-white shadow-sm"
                : "border border-[#E5E0D3] bg-[#FFFDF8] text-[#454A42] hover:border-[#245C3A] hover:text-[#245C3A]"
            }`}
          >
            Everything
            {!loading && (
              <span className="ml-2 opacity-75">{menuItems.length}</span>
            )}
          </button>

          {menus.map((menu) => {
            const isSelected =
              String(selectedMenuId) === String(menu.id);

            const categoryCount = menuItems.filter(
              (item) => String(item.menu_id) === String(menu.id)
            ).length;

            return (
              <button
                key={menu.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedMenuId(menu.id)}
                className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2 ${
                  isSelected
                    ? "bg-[#245C3A] text-white shadow-sm"
                    : "border border-[#E5E0D3] bg-[#FFFDF8] text-[#454A42] hover:border-[#245C3A] hover:text-[#245C3A]"
                }`}
              >
                {menu.name}
                {!loading && (
                  <span className="ml-2 opacity-75">{categoryCount}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Loading state */}
        {loading && (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="status"
            aria-label="Loading menu items"
          >
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <div
                key={number}
                className="animate-pulse overflow-hidden rounded-2xl bg-[#FFFDF8] p-4"
              >
                <div className="aspect-[4/3] rounded-xl bg-[#E9E2D3]" />
                <div className="mt-4 h-5 w-2/3 rounded bg-[#E9E2D3]" />
                <div className="mt-3 h-4 w-full rounded bg-[#E9E2D3]" />
                <div className="mt-2 h-4 w-1/2 rounded bg-[#E9E2D3]" />
                <span className="sr-only">Loading menu items...</span>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            className="rounded-2xl border border-red-200 bg-[#FFFDF8] px-6 py-12 text-center"
            role="alert"
          >
            <h3 className="font-display text-2xl font-bold text-[#20251F]">
              The menu isn't available right now
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#62675F]">
              Something went wrong while loading our dishes. Please try
              again in a moment.
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 rounded-xl bg-[#245C3A] px-6 py-3 font-semibold text-white transition hover:bg-[#19472B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C3A] focus-visible:ring-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* Menu items */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="rounded-2xl border border-[#E5E0D3] bg-[#FFFDF8] px-6 py-14 text-center">
            <span className="text-4xl" aria-hidden="true">
              🍽️
            </span>

            <h3 className="mt-4 font-display text-2xl font-bold text-[#20251F]">
              Nothing on the menu just yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#62675F]">
              There aren't any dishes in this category right now. Explore
              everything else on our menu.
            </p>

            {selectedMenuId !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedMenuId("all")}
                className="mt-5 font-semibold text-[#245C3A] underline underline-offset-4"
              >
                View all items
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Menu;

