
from fastapi import Cookie, Depends, HTTPException, status
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.database import settings
from app.repositories.customer_repository import CustomerRepository
from app.services.exception import InvalidCredentials


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_current_customer( access_token: str | None = Cookie(default=None), db: Session = Depends(get_db),):

    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    try:
        payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM], )

        customer_id = payload.get("sub")

        if not customer_id:
            raise InvalidCredentials()

    except (JWTError, ValueError):
        raise InvalidCredentials()

    repository = CustomerRepository(db)

    customer = repository.get_by_id(customer_id)

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Customer not found",
        )

    if not customer.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive",
        )

    return customer