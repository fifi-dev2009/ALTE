from app.database import Base
from sqlalchemy import String, func, DateTime, Boolean, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING
from datetime import datetime

import uuid

if TYPE_CHECKING: 
 from .cart import Cart
 from .order import Order 

class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[str] = mapped_column(String(36), primary_key = True, default=lambda: str(uuid.uuid4()),)
    name: Mapped[str] = mapped_column(String(100), nullable= False)
    phone: Mapped[str] = mapped_column(String(20), nullable= False)
    email: Mapped[str] = mapped_column(String(255), nullable= False, unique= True,index= True )
    password: Mapped[str] = mapped_column(String(255), nullable= False)
    is_active: Mapped[bool] = mapped_column(Boolean, default= True, nullable= False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False,)
    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False,)
    deleted_at : Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
        
    orders: Mapped[list["Order"]] = relationship(back_populates="customer")   
    cart: Mapped["Cart"] = relationship(back_populates="customer", uselist= False) # 1-1 relationship
    
