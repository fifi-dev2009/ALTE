from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.cart import Cart, CartItem

class CartRepository:

    def __init__(self, session:Session):
        self.session = session

    def get_cart_by_customer(self, customer_id:str) -> Cart | None:
        statement = self.session.execute(select(Cart).where(Cart.customer_id == customer_id))

        return statement.scalar_one_or_none()

    def get_cart_by_id(self, cart_id:str) -> Cart| None:
        statement = self.session.execute(select(Cart).where(Cart.id == cart_id))

        return statement.scalar_one_or_none()
   
    def create_cart(self, cart:Cart) -> Cart:
        self.session.add(cart)

        self.session.flush()
        self.session.refresh(cart)
        return cart

    def add_item_to_cart(self, cart_item:CartItem) -> CartItem:
        self.session.add(cart_item)

        self.session.commit()
        self.session.refresh(cart_item)
        return cart_item

    def get_cart_item(self,cart_id:str,menu_item_id:str) -> CartItem | None:
        statement = self.session.execute(select(CartItem).where(CartItem.cart_id == cart_id, CartItem.menu_item_id == menu_item_id))

        return statement.scalar_one_or_none()


    def get_cart_item_by_id(self, cart_item_id: str)-> CartItem | None:
        cart_item = self.session.execute(select(CartItem).where(CartItem.id == cart_item_id))
        return cart_item.scalar_one_or_none()

    def get_cart_items(self, cart_id:str) -> list[CartItem]:
        statement = self.session.execute(select(CartItem).where(CartItem.cart_id == cart_id))

        return list(statement.scalars().all())


    def update_cart_item(self, cart_item: CartItem)-> CartItem:
        self.session.commit()

        self.session.refresh(cart_item)
        return cart_item

    def remove_cart_item(self, cart_item: CartItem) -> None:
        self.session.delete(cart_item)
        self.session.commit()

    
    def clear_cart(self, cart_id: str) -> None:
      cart_items = self.get_cart_items(cart_id)

      for item in cart_items:
        self.session.delete(item)

      self.session.commit()


    # def clear_cart(self, cart_id: str) -> None:
    #     statement = self.get_cart_by_id(cart_id)
    #     cart_items = list(self.session.scalars(statement).all())
    #     for item in cart_items:
    #         self.session.delete(item)
    #     self.session.commit()

    def clear_carts(self, cart: Cart) -> None:
        statement = self.session.execute(select(CartItem).where(CartItem.cart_id == cart.id))

        cart_items = list(statement.scalars().all())
        for item in cart_items:
            self.session.delete(item)

        




