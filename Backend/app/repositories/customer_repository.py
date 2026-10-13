from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.customer import Customer


class CustomerRepository:

    def __init__(self, session: Session):
        self.session = session

    def create(self, customer: Customer) -> Customer:
        self.session.add(customer)
        self.session.flush()
        self.session.refresh(customer)

        return customer

    def get_by_id(self, customer_id: str) -> Customer | None:
        statement = self.session.execute(select(Customer).where(Customer.id == customer_id, Customer.deleted_at.is_(None)))

        return statement.scalar_one_or_none()

    def get_by_email(self, email: str) -> Customer | None:
        statement = self.session.execute(select(Customer).where(Customer.email == email, Customer.deleted_at.is_(None)))

        return statement.scalar_one_or_none()

    def get_all(self) -> list[Customer]:
        statement = self.session.execute(select(Customer).where(Customer.deleted_at.is_(None)))

        return list(statement.scalars().all())

    def update(self, customer: Customer) -> Customer:
        self.session.commit()
        self.session.refresh(customer)

        return customer

    def delete(self, customer: Customer) -> None:
        self.session.delete(customer)
        self.session.commit()
