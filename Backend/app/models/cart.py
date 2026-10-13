from sqlalchemy import ForeignKey, DateTime, CheckConstraint, UUID, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING
import uuid

if TYPE_CHECKING: 
 from .customer import Customer
 from .menu import  MenuItem
from datetime import datetime

from app.database import Base

class Cart(Base):
    __tablename__ = "carts"

    id: Mapped[str] = mapped_column(String(36), primary_key = True, default=lambda: str(uuid.uuid4()),)
    customer_id: Mapped[str] = mapped_column( String(36),ForeignKey("customers.id"),nullable=False,)
    created_at : Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    customer: Mapped["Customer"] = relationship(back_populates="cart")
    items: Mapped[list["CartItem"]] = relationship(back_populates="cart")

class CartItem(Base):
    __tablename__ = "cart_items"


    id: Mapped[str] = mapped_column(String(36), primary_key = True, default=lambda: str(uuid.uuid4()),)
    cart_id: Mapped[str] = mapped_column( String(36),ForeignKey("carts.id"), nullable=False,)
    menu_item_id : Mapped[str] = mapped_column(String(36),ForeignKey("menu_items.id"), nullable= False)
    quantity: Mapped[int] = mapped_column(nullable= False)
    cart : Mapped["Cart"] = relationship(back_populates ="items")
    created_at : Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    menu_item : Mapped["MenuItem"] = relationship()

    __table_args__ =(CheckConstraint("quantity > 0", name="check_cart_item_quantity_non_neative"),)
