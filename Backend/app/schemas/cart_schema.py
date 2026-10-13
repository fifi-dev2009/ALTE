from pydantic import BaseModel, Field, ConfigDict
from decimal import Decimal

class CartItemCreate(BaseModel):
    
    menu_item_id:str
    quantity:int

class CartItemResponse(BaseModel):
    id:str
    menu_item_id: str
    name:str
    unit_price:Decimal
    sub_total: Decimal
    quantity:int

    model_config = ConfigDict(from_attributes= True)

class CartResponse(BaseModel):
    id: str
    items: list[CartItemResponse]
    total: Decimal

    model_config = ConfigDict(from_attributes= True)


class CartItemUpdate(BaseModel):
    quantity : int
   




