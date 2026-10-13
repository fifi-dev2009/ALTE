from fastapi import APIRouter, Depends, Response, status, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import SessionLocal

from app.dependencies.auth_depend import get_current_customer
from app.models.customer import Customer
from app.schemas.customer_schema import (CustomerCreate,CustomerLogin,CustomerResponse,CustomerUpdate,)
from app.services.customer_sevices import CustomerService
from app.services.exception import EmailAlreadyRegistered
from app.config import settings
from app.dependencies.dependency import limiter


router = APIRouter(prefix="/customers",tags=["Customers"],)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_customer_service( session: Session = Depends(get_db),) -> CustomerService:
    return CustomerService(session)

@router.post( "/register",response_model=CustomerResponse,status_code=status.HTTP_201_CREATED,)
@limiter.limit("5/minute")
def register_customer(request:Request, customer_data: CustomerCreate,service: CustomerService = Depends(get_customer_service),)-> CustomerResponse:
    try:
        customer =  service.create_customer(customer_data)
        return customer
    except EmailAlreadyRegistered:
        raise HTTPException(
            status_code= status.HTTP_409_CONFLICT, detail="An account with this email already exisits."
        )

@router.post("/login")
@limiter.limit("5/minute")
def login_customer(request:Request, customer_data: CustomerLogin, response: Response, service: CustomerService = Depends(get_customer_service),):
    token = service.login_customer( email=customer_data.email, password=customer_data.password,)

    response.set_cookie(
        key="access_token",value=token,httponly=True,secure=False,  samesite ="lax", max_age = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60, path="/"
    )

    return {"message": "Login successful"}


@router.get( "/me", response_model=CustomerResponse )
def get_my_profile( current_customer: Customer = Depends(get_current_customer),):
    return current_customer


@router.patch("/me",response_model=CustomerResponse,)
@limiter.limit("5/minute")
def update_my_profile(request:Request, customer_data: CustomerUpdate, current_customer: Customer = Depends(get_current_customer),service: CustomerService = Depends(get_customer_service),):
    return service.update_customer(customer_id=current_customer.id, customer_data=customer_data, )


@router.post("/logout")
@limiter.limit("5/minute")
def logout_customer(request:Request,response: Response):
    response.delete_cookie(
        key="access_token",
        path="/",
        httponly=True,
        # secure=False,
        # samesite="lax",
    )

    return {"message": "Logout successful"}