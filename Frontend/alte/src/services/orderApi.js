import { apiFetch } from "./api";

export function placeOrder() {
    return apiFetch("/orders", {
        method: "POST",
    }) 
}

export function getOrders() {
    return apiFetch("/orders") 
}


export function getOrder(orderId) {
    return apiFetch(`/orders/${orderId}`) 
}



