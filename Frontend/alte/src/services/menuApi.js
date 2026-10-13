import { apiFetch } from "./api";

export  function getMenus() {

    return apiFetch("/menus");
}

export  function getAllMenuItems() {

    return apiFetch("/menu_items");
}
