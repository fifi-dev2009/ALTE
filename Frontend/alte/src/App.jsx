import { Routes, Route } from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useEffect} from "react"

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import Cart from "./pages/Cart";
import OrderReceipt from "./components/food/OrderReceipt";
import OrderHistory from "./pages/OrderHistory";


function ScrollToTop(){
  const {pathname} = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0)
  }, [pathname]);
  return null;
}
function App() {
 

  return (
    <div className="min-h-screen bg-cream">

      <ScrollToTop />
      <Navbar  />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <Routes>
        <Route path="/about" element= {<About />} />
      </Routes>
      <Routes>
        <Route path="/contact" element= {<Contact />} />
      </Routes>

      <Routes>
        < Route path="/register" element ={<Register />}/>
      </Routes>  
      <Routes>
        < Route path="/login" element ={<Login />}/>
      </Routes>  
      <Routes>
        < Route path="/profile" element ={<Profile />}/>
      </Routes>  

      <Routes>
        < Route path="/orders/:orderId" element ={<OrderReceipt />}/>
      </Routes>  
      <Routes>
        < Route path="/cart" element ={<Cart />}/>
      </Routes>  
      <Routes>
        < Route path="/orderhistory" element ={<OrderHistory />}/>
      </Routes>  
      

      <Footer />


    </div>
    
  );

};

export default App;