from app.models.order import Order, OrderItem, OrderStatus
from app.services.exception import CartNotFound, MenuNotFound
from app.repositories.cart_repository import CartRepository
from app.repositories.menu_reposiory import MenuRepository
from app.repositories.order_repository import OrderRepository
from app.schemas.order_schema import OrderResponse
from datetime import datetime, timezone
from decimal import Decimal
from sqlalchemy.orm import Session
from fastapi import HTTPException, status


class OrderService:
    def __init__(self,session:Session, ):
        self.session = session
        self.repository = OrderRepository(session)
        self.menu_repository = MenuRepository(session)
        self.cart_repository = CartRepository(session)

    def create_order_from_cart( self,  customer_id: str ) -> OrderResponse:
        cart = self.cart_repository.get_cart_by_customer(customer_id)
        if not cart:
            raise CartNotFound("Cart not found")

        cart_items = self.cart_repository.get_cart_items(cart.id)
       
        if not cart_items:
            raise CartNotFound("Cart is empty.....")

        total_price = Decimal("0.00")
        validated_items = []

        for cart_item in cart_items:

            menu_item = self.menu_repository.get_menu_item_by_id(cart_item.menu_item_id)

            if not menu_item:
                raise MenuNotFound()

            if not menu_item.is_available:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Menu Item no longer available")

            if menu_item.quantity < cart_item.quantity:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Not enough stock")

            sub_total = (menu_item.price * cart_item.quantity)
            total_price +=sub_total

            validated_items.append({
                "cart_item" : cart_item,
                "menu_item" : menu_item,
                "sub_total" : sub_total
            })

        try:
            order = Order(
                customer_id= customer_id,
                status = OrderStatus.PENDING.value,
                total_price = total_price
                 )
            
            self.repository.create_order(order)

            for item in validated_items:
                cart_item = item["cart_item"]
                menu_item = item["menu_item"]
                sub_total = item["sub_total"]

                order_item = OrderItem(
                    order_id = order.id,
                    menu_item_id = menu_item.id,
                    name = menu_item.name,
                    unit_price = menu_item.price,
                    quantity = cart_item.quantity,
                    sub_total = sub_total
                )

                self.repository.create_order_item(order_item)

                menu_item.quantity -= cart_item.quantity

                self.cart_repository.clear_carts(cart)

                self.session.commit()
                self.session.refresh(order)

                return OrderResponse.model_validate(order)
        except Exception:
            self.session.rollback()
            raise
    

    def get_order(self, order_id:str ,customer_id: str)-> OrderResponse:
        order= self.repository.get_by_id_and_customer(order_id, customer_id)

        if not order:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
        return OrderResponse.model_validate(order)

    def get_orders(self, customer_id: str)-> list[OrderResponse]:
        orders = self.repository.get_orders_by_customer(customer_id)
        return [OrderResponse.model_validate(order) for order in orders]

    

           

        