from pydantic import BaseModel, EmailStr, ConfigDict

from datetime import datetime

class MenuCreate(BaseModel):
    name: str

class MenuResponse(BaseModel):
    id: str
    name:str
    created_at : datetime

    model_config = ConfigDict(from_attributes= True)

class MenuItemCreate(BaseModel):
    name:str
    description: str
    price: float
    quantity: int

class MenuItemUpdate(BaseModel):
    price:float | None = None
    quantity:int | None = None

class MenuItemResponse(BaseModel):
    id: str
    menu_id : str
    name:str
    description: str
    price: float
    quantity: int
    created_at : datetime

    model_config = ConfigDict(from_attributes= True)
    

