from pydantic import BaseModel, ConfigDict
from app.models.order import OrderStatus
from datetime import datetime
from decimal import Decimal


class OrderItemResponse(BaseModel):
    id: str
    name:str
    unit_price:Decimal
    quantity:int
    menu_item_id: str
    subtotal: Decimal

    model_config = ConfigDict(from_attributes=True)


class OrderResponse(BaseModel):
    id: str
    status: OrderStatus
    items:list[OrderItemResponse]
    total_price: Decimal
    created_at:datetime

    model_config = ConfigDict(from_attributes=True)



