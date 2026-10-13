from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.order import Order, OrderItem
class OrderRepository:

    def __init__(self, session: Session):
        self.session = session

    def create_order(self, order: Order) -> Order:
        self.session.add(order)
        self.session.flush()
        self.session.refresh(order)

        return order

    def create_order_item(self, order_item: OrderItem)-> OrderItem:
        self.session.add(order_item)
        self.session.flush()
        self.session.refresh(order_item)

        return order_item

    def get_order_by_id(self, order_id: str) -> Order | None:
        statement = self.session.execute(select(Order).where(Order.id == order_id))

        return statement.scalar_one_or_none()

    def get_orders_by_customer(self,customer_id: str) -> list[Order]:
        statement = self.session.execute(select(Order).where(Order.customer_id == customer_id))

        return list(statement.scalars().all())

    def get_by_id_and_customer(self,order_id: str, customer_id: str) -> Order | None:
        statement = self.session.execute(select(Order).where(Order.id== order_id, Order.customer_id == customer_id))
        return statement.scalar_one_or_none()


 