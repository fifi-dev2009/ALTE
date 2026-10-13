import { apiFetch } from "./api";

export function getCart() {
    return apiFetch("/cart")
}

export function addToCart(menuItemId, quantity= 1){
      return apiFetch("/cart/items", {
        method : "POST",
        body : JSON.stringify({menu_item_id : menuItemId, quantity}),
      });
}

export function updateCartItem(cartItemId, quantity){
      return apiFetch(`/cart/items/${cartItemId}`, {
        method : "PATCH",
        body : JSON.stringify({quantity}),
      });
}

export function removeCartItem(cartItemId){
      return apiFetch(`/cart/items/${cartItemId}`, {
        method : "DELETE",
       
      });
}

export function clearCart(){
      return apiFetch("/cart", {
        method : "DELETE",
       
      });
}