from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.dependencies.auth_depend import get_current_customer
from app.models.customer import Customer
from app.dependencies.dependency import limiter
from app.schemas.cart_schema import (CartItemCreate,CartResponse,CartItemResponse, CartItemUpdate )
from app.services.cart_services import CartService


router = APIRouter(prefix="/cart", tags=["Cart"])

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

def get_cart_service( session: Session = Depends(get_db),) -> CartService:
    
    return CartService(session)        

@router.get("", response_model=CartResponse)
def get_my_cart (current_customer: Customer= Depends(get_current_customer), service: CartService = Depends(get_cart_service)):
    return service.get_my_cart(customer_id =current_customer.id)

@router.post("/items", response_model= CartResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("30/minute")
def add_item_to_cart(request: Request, item_data:CartItemCreate, customer: Customer = Depends(get_current_customer), service: CartService= Depends(get_cart_service)):
    return service.add_item_to_cart(customer.id , item_data)

@router.patch("/items/{cart_item_id}", response_model=CartResponse)
@limiter.limit("30/minute")
def update_item(request: Request ,cart_item_id: str, item_data:CartItemUpdate, customer:Customer = Depends(get_current_customer), service: CartService = Depends(get_cart_service)):
    return service.update_item(customer.id, cart_item_id,  item_data)

@router.delete("/items/{cart_item_id}", response_model=CartResponse)
@limiter.limit("30/minute")
def delete_item(request:Request, cart_item_id: str,  customer:Customer = Depends(get_current_customer), service: CartService = Depends(get_cart_service)):
    return service.remove_cart_items(customer.id, cart_item_id, )

@router.delete("", response_model=CartResponse)
@limiter.limit("30/minute")
def delete_cart(request:Request,customer:Customer = Depends(get_current_customer), service: CartService= Depends(get_cart_service)):
    return service.clear_cart(customer_id=customer.id)



