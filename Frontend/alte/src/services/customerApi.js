import { apiFetch } from "./api";

export function registerCustomer(customerCreate) {

    return apiFetch("/customers/register", {
        method : "POST",
        body : JSON.stringify(customerCreate),
    });
    
}

export function loginCustomer(customerLogin) {
    return apiFetch("/customers/login", {
        method : "POST",
        body : JSON.stringify(customerLogin),
    });
    
}

export function getMyProfile() {
    return apiFetch("/customers/me");   
}

export function updateCustomer(customerData) {
    return apiFetch("/customers/me", {
        method : "PATCH",
        body : JSON.stringify(customerData),
    });
    
}

export function logoutCustomer() {
    return apiFetch("/customers/logout", {
        method : "POST",      
    });
    
}


