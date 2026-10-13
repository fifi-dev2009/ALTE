from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from app.models.customer import Customer
from app.repositories.customer_repository import CustomerRepository
from app.schemas.customer_schema import CustomerCreate, CustomerUpdate
from app.security import (hash_password,verify_password,create_access_token,)
from app.services.exception import EmailAlreadyRegistered, InvalidCredentials
from sqlalchemy.orm import Session



class CustomerService:
    def __init__(self,  session:Session):
        self.session = session
        self.repository = CustomerRepository(session)


    def create_customer(self, customer_data: CustomerCreate) -> Customer: 
        existing_customer = self.repository.get_by_email(customer_data.email)

        if existing_customer:
            raise EmailAlreadyRegistered()

        hashed_password = hash_password(customer_data.password)

        customer = Customer(
            name=customer_data.name,
            email=customer_data.email,
            phone=customer_data.phone,
            password=hashed_password,
        )

        try:
            customer = self.repository.create(customer)

            self.repository.session.commit()
           
            return customer
        except IntegrityError:
            self.session.rollback()
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Unable to create customer Account")

        except Exception:
            self.session.rollback()
            
        

    def login_customer(self,email: str,password: str, ) -> str:

        customer = self.repository.get_by_email(email)
        
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        if not verify_password(password,customer.password, ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        
        if not customer.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive",
            )

        # 4. Create JWT
        access_token = create_access_token(
            {
                "sub": str(customer.id),
            }
        )

        return access_token

    def get_customer(self, customer_id: str) -> Customer:

        customer = self.repository.get_by_id(customer_id)

        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Customer not found",
            )

        return customer

    def update_customer(self,customer_id: str,customer_data: CustomerUpdate,) -> Customer:

        customer = self.repository.get_by_id(customer_id)

        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Customer not found",
            )

        
        if ( customer_data.email and customer_data.email != customer.email ):
            existing_customer = self.repository.get_by_email( customer_data.email )

            if existing_customer:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Email already registered",
                )

        
        update_data = customer_data.model_dump( exclude_unset=True )

        for field, value in update_data.items():
            setattr(customer, field, value)

        return self.repository.update(customer)