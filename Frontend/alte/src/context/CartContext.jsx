import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart as addToCartRequest, updateCartItem, removeCartItem, clearCart as clearCartRequest } from "../services/cartApi";
import { useAuth } from "./AuthContext";
const CartContext = createContext(null);
export function CartProvider({children}) {
    const {isAuthenticated, loading: authLoading} = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading ] = useState(false)
    async function refreshCart() {
        if (!isAuthenticated){
            setCart(null);
            return; }
        try {
            setLoading(true)
            const data = await getCart();
            setCart(data)
        } finally {
            setLoading(false) }
    }
    async function addToCart(menuItemId) {
        const updatedCart = await addToCartRequest(menuItemId, 1);
        setCart(updatedCart);
        return updatedCart;}
    async function updateQuantity(cartItemId, quantity) {
        const updatedCart = await updateCartItem(cartItemId, quantity);
        setCart(updatedCart);
        return updatedCart; }
    async function removeItem(cartItemId) {
        const updatedCart = await removeCartItem(cartItemId);
        setCart(updatedCart);
        return updatedCart;  }
    async function clearCart() {
        const updatedCart = await clearCartRequest();
        setCart(updatedCart);
        return updatedCart; }
    useEffect(()=> {
        if(!authLoading){
            refreshCart();
        }}, [isAuthenticated, authLoading]);
    const itemCount = cart?.items?.reduce((total, item)=> total +item.quantity, 0)??0;
    const value = { cart,loading, itemCount, refreshCart, addToCart, updateQuantity, removeItem, clearCart };
    return ( <CartContext.Provider value={value}> {children}</CartContext.Provider> );
}
export function useCart() { return useContext(CartContext);}



