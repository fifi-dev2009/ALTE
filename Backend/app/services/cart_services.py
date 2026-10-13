from app.models.cart import Cart, CartItem
from app.services.exception import MenuNotFound, CartNotFound, ItemNotFound, InvalidQuantityError

from app.repositories.cart_repository import CartRepository
from app.repositories.menu_reposiory import MenuRepository
from app.schemas.cart_schema import  CartItemCreate, CartResponse, CartItemResponse, CartItemUpdate
from sqlalchemy.orm import Session
from decimal import Decimal
from fastapi import HTTPException, status
class CartService:
    def __init__(self,session:Session ):
        self.session = session
        self.cart_repository = CartRepository(session)
        self.menu_repository = MenuRepository(session)

      
    def build_cart_response(self, cart:Cart)-> CartResponse:
      items = []
      for cart_item in cart.items:
          unit_price = cart_item.menu_item.price
          sub_total = unit_price * cart_item.quantity

          items.append(CartItemResponse(id = cart_item.id, menu_item_id= cart_item.menu_item_id, name=  cart_item.menu_item.name, unit_price=unit_price, quantity= cart_item.quantity,  sub_total= sub_total))

      total = sum(item.sub_total for item in items)

      return CartResponse(id= cart.id, items=items, total= total)


   
    def create_cart(self, customer_id:str)-> Cart:
       
          cart = Cart(customer_id = customer_id)
          try :
             self.cart_repository.create_cart(cart)
             self.cart_repository.session.commit()

             return cart
          except:
             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unable to create cart")

       
    def get_cart(self, customer_id:str) -> Cart:
        cart = self.cart_repository.get_cart_by_customer(customer_id)

        if not cart:
           return{
              "id": None,
              "items":[],
              "total": Decimal("0.00")
           }

        return self.build_cart_response(cart)

    def add_item_to_cart(self,customer_id: str, item_data:CartItemCreate) -> Cart:

     cart = self.cart_repository.get_cart_by_customer(customer_id)

     if not cart:
        self.create_cart(customer_id)
     if item_data.quantity <= 0:
        raise InvalidQuantityError()

     menu_item = self.menu_repository.get_menu_item_by_id( item_data.menu_item_id)
     if not menu_item:
        raise MenuNotFound()

     if menu_item.quantity < item_data.quantity: 
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail= "Not enough items available")

     carts = self.cart_repository.get_cart_by_customer(customer_id)

     cart_item = self.cart_repository.get_cart_item(cart_id=carts.id, menu_item_id= item_data.menu_item_id)

     if cart_item:
        new_quantity = cart_item.quantity + item_data.quantity
        if new_quantity > menu_item.quantity:
           raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail= "Not enough items available")

        cart_item.quantity = new_quantity
        self.cart_repository.update_cart_item(cart_item)

        return self.build_cart_response(carts)

     else:
        cart_add = CartItem(
        cart_id = cart.id, 
        menu_item_id= item_data.menu_item_id, 
        quantity= item_data.quantity)

        self.cart_repository.add_item_to_cart(cart_add)
   
        return self.build_cart_response(carts)
     
    def get_my_cart(self, customer_id:str)-> Cart:
       cart = self.cart_repository.get_cart_by_customer(customer_id)
       if not cart:
          self.create_cart(customer_id)
          return{
                  "id": None,
                  "items":[],
                  "total": Decimal("0.00")
            }
       else:
          return self.build_cart_response(cart)
       
      

    def update_item(self, customer_id: str, cart_item_id: str, item_data: CartItemUpdate) -> Cart:

     if item_data.quantity <= 0:
        raise InvalidQuantityError()

     cart = self.cart_repository.get_cart_by_customer(customer_id)
     if not cart:
        raise CartNotFound()

     cart_item = self.cart_repository.get_cart_item_by_id(cart_item_id)
     if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")

     menu_item = self.menu_repository.get_menu_item_by_id(cart_item.menu_item_id)
     if not menu_item:
        raise MenuNotFound()
     
     if menu_item.quantity < item_data.quantity: 
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="We dont have this quantity presntly")

     cart_item.quantity = item_data.quantity

     updated_item = self.cart_repository.update_cart_item(cart_item)


     return self.build_cart_response(cart)

    def remove_cart_items( self,customer_id: str,cart_item_id: str) -> CartResponse:
      cart = self.cart_repository.get_cart_by_customer(customer_id)

      if not cart:
        raise CartNotFound()

      cart_item = self.cart_repository.get_cart_item_by_id(cart_item_id)

      if not cart_item or cart_item.cart_id != cart.id:
        raise ValueError("Cart item not found")

      self.cart_repository.remove_cart_item(cart_item)

    # Reload the relationship after deleting the item.
      self.session.expire(cart, ["items"])

      return self.build_cart_response(cart)


    def clear_cart(self, customer_id: str) -> CartResponse:
      cart = self.cart_repository.get_cart_by_customer(customer_id)

      if not cart:
        raise CartNotFound()

      self.cart_repository.clear_cart(cart.id)

    # Reload items after clearing the cart.
      self.session.expire(cart, ["items"])

      return self.build_cart_response(cart)


 
       