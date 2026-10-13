from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.dependencies.auth_depend import get_current_customer
from app.services.order_services import OrderService
from app.schemas.order_schema import OrderResponse
from app.dependencies.dependency import limiter

router = APIRouter(prefix= "/orders", tags=["Orders"])

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_order_service(session: Session = Depends(get_db), )-> OrderService:
    return OrderService(session)

@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def create_order(request:Request,current_customer = Depends(get_current_customer),service: OrderService = Depends(get_order_service)):
    return service.create_order_from_cart(current_customer.id)

@router.get("", response_model=list[OrderResponse])
def get_orders(current_customer = Depends(get_current_customer),service: OrderService = Depends(get_order_service)):
    return service.get_orders(current_customer.id)

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: str, current_customer = Depends(get_current_customer),service: OrderService = Depends(get_order_service)):
    return service.get_order(order_id, current_customer.id)
    
