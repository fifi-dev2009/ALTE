import { useState } from "react";
import { Link , NavLink} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, Menu, X , UserCircle2Icon , ChefHat} from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const  navLinks =[
    {name: "Home", path:"/"},
    {name: "Menu", path:"/menu"},
    {name: "About", path:"/about"},
    {name: "Contact", path:"/contact"}, 
  ]
  
  const {itemCount} = useCart();
  const { isAuthenticated} = useAuth();

  return (
    <header className="relative sticky top-0 z-50  bg-cream">
      <nav className="mx-auto flex max-w-[1280px] h-16 items-center justify-between border-b border-green/10 px-5 md:px-8 md:h-[72px] sm:px-6"  aria-label="Main navigation">     

        <Link to="/" className="font-display flex items-center text-[1.65rem] font-semibold tracking-tight text-green " onClick={()=> setIsMenuOpen(false)} aria-label="Alte home"> Alte<span ><ChefHat className="text-yellow"/></span></Link>

        <div className="hidden items-center gap-7 md:flex lg:gap-8">
          {navLinks.map((link) => ( <NavLink key={link.path} to={link.path} end={link.path === "/"} className={({isActive})=> ` group relative py-1 text-sm font-medium after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-green after:transition-all after:duration-200   hover:text-charcoal/70 ${isActive? "after:w-full text-green":" text-fresh-green after:w-0"}`}>{link.name}</NavLink> )
            )}
        </div>

        <div className="hidden md:flex items-center gap-3"> 
          {isAuthenticated ? 
          (<Link to="/profile" aria-label="View Profile" className="flex h-10 w-10 items-center justify-center rounded-full text-green transition-all duration-200 hover:bg-green/10 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow">
               <UserCircle2Icon size={27} strokeWidth={1.6}/>
          </Link> ):  
          (<Link to="/login" className=" rounded-full border border-green px-4 py-2 text-sm font-medium text-green transition-all duration-200  hover:bg-green hover:text-soft-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible: ring-offset-2">Sign in</Link>)
          } 

          <Link to="/cart" className="group flex items-center gap-2 rounded-full bg-[#245C3A] px-4 py-2.5 text-sm font-semibold text-[#FFFDF8] transition-all duration-200  hover:bg-fresh-green hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B84A] focus-visible:ring-offset-2 " aria-label={`${itemCount} items in cart `} >
          <ShoppingCart size={17} strokeWidth={2} className="transition-transform duration-200 group-hover:-rotate-3"/><span>Cart</span>{itemCount > 0 && (<span className="flex items-center justify-center px-1.5 py-0.5 bg-yellow min-w-5 rounded-full text-charcoal text-[10px] font-bold leading-none ">{itemCount}</span>)}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 md:hidden">   
          <Link to="/cart" className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#245C3A] transition-all duration-200 hover:bg-green/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B84A]" aria-label={`${itemCount} items in cart`} >
            <ShoppingCart size={20} strokeWidth={1.9} />
            {itemCount > 0 && ( <span className="absolute right-0.5 top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#E6B84A] px-1 text-[9px] font-bold text-[#20251F] leading-none ring-2 ring-cream">{itemCount}</span> )}
          </Link>

          <button type="button" onClick={() => setIsMenuOpen((current) => !current)} className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#245C3A] focus:outline-none focus:ring-2 focus:ring-[#E6B84A]" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} >{isMenuOpen ? <X size={22}  strokeWidth={1.8}/> : <Menu size={22} strokeWidth={1.8} />} </button>
        </div>
      </nav>
      {/* Mobile navigation */}
      <div className={`overflow-hidden border-b border-green/10 bg-soft-white transition-all duration-200 md:hidden ${isMenuOpen ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0 "}`}>
      <div className="mx-auto max-w-[1280px] px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-1">
            {navLinks.map((link) => (<NavLink key={link.path} to={link.path} end={link.path === "/"} onClick={() => setIsMenuOpen(false)} className={({isActive})=> `rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B84A] ${ isActive ?"bg-green/10 text-green" :"text-[#20251F] hover:bg-green/5 hover:text-green"}`}>{link.name}</NavLink>
          ))}
          </div>

          <div className="my-3 h-px bg-green/10"/>
              {isAuthenticated ? (
            <Link to="/profile" aria-label="View Profile" onClick={()=> setIsMenuOpen(false)} className="flex items-center gap-3  rounded-xl px-4 py-3 text-sm font-medium text-green transition-colors duration-200 hover:bg-green/10  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"> <UserCircle2Icon size={20} strokeWidth={1.7}/> <span>Profile</span></Link> )
             : (<Link to="/login"  onClick={()=> setIsMenuOpen(false)} className=" flex items-center justify-center rounded-full bg-green  px-4 py-3 text-sm font-semibold text-soft-white transition-all duration-200  hover:bg-[#4f7d50]active:scale-[0.98]  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible: ring-offset-2">Sign in</Link>)} 
      </div>
      
      </div>
   
    </header>
  );
}

export default Navbar;

