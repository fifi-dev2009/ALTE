from datetime import datetime
from app.database import Base
from enum import Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, CheckConstraint, Numeric, DateTime, UUID
from typing import TYPE_CHECKING
import uuid
if TYPE_CHECKING: 
 from .customer import Customer
 from .menu import MenuItem



class OrderStatus(Enum):
    PENDING = "pending"
    PAID = "paid"
    CANCELLED = "cancelled"


class Order(Base):
    __tablename__ ="orders"

    id: Mapped[str] = mapped_column(String(36), primary_key = True, default=lambda: str(uuid.uuid4()),)
    customer_id: Mapped[str] = mapped_column( String(36),ForeignKey("customers.id"),nullable=False,)
    total_price : Mapped[float] = mapped_column(Numeric(10, 2), nullable= False)
    status: Mapped["str"] = mapped_column(String(30), nullable= False, default = OrderStatus.PENDING.value)
    created_at : Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    customer: Mapped["Customer"] = relationship(back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship(back_populates="order")

    __table_args__ = (CheckConstraint("total_price > 0", name="check_total_price_positive"),)


class OrderItem(Base):

    __tablename__ = "order_items"

    id: Mapped[str] = mapped_column(String(36), primary_key = True, default=lambda: str(uuid.uuid4()),)
    order_id: Mapped[str] = mapped_column( String(36),ForeignKey("orders.id"),nullable=False,)
    menu_item_id: Mapped[str] = mapped_column( String(36),ForeignKey("menu_items.id"),nullable=False,)
    name:Mapped[str]= mapped_column(String(36), nullable=False)
    quantity: Mapped[int] = mapped_column(nullable= False)
    unit_price: Mapped[float] = mapped_column(Numeric(10,2), nullable= False)
    sub_total : Mapped[float] = mapped_column(Numeric(10,2), nullable= False)
    created_at : Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    order: Mapped["Order"] = relationship(back_populates="items")
    menu_item: Mapped["MenuItem"] = relationship()


    __table_args__ = (CheckConstraint("quantity > 0", name="check_order_item_quantity_positive"), CheckConstraint("unit_price > 0", name="check_order_item_price_positive"),)

    @property
    def subtotal(self) -> int:
        return self.quantity * self.unit_price
