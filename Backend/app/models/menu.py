from app.database import Base
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Numeric, CheckConstraint, ForeignKey, DateTime, UUID
import uuid

class Menu(Base):
    __tablename__ = "menus"

    id: Mapped[str] = mapped_column(String(36), primary_key = True, default=lambda: str(uuid.uuid4()),)
    name : Mapped[str] = mapped_column(String(100),  nullable= False)
    items: Mapped[list["MenuItem"]] = relationship(back_populates="menu")
    created_at : Mapped[datetime] = mapped_column(DateTime, default= datetime.utcnow, nullable= False)
    


class MenuItem(Base):
    __tablename__ = "menu_items"

    id: Mapped[str] = mapped_column(String(36), primary_key = True, default=lambda: str(uuid.uuid4()),)
    menu_id: Mapped[str] = mapped_column( String(36),ForeignKey("menus.id"),nullable=False,)
    name : Mapped[str] = mapped_column(String(100), nullable= False)
    
    price: Mapped[float] = mapped_column(Numeric(10,2), nullable= False)
    quantity : Mapped[int] = mapped_column(nullable= False, default= 0)
    description : Mapped[str] = mapped_column(String(500), nullable= True)
    created_at : Mapped[datetime] = mapped_column(DateTime, default= datetime.utcnow, nullable= False)
    deleted_at : Mapped[datetime | None] = mapped_column(DateTime, nullable= True)

    menu: Mapped["Menu"] = relationship(back_populates="items")

    __table_args__ = (CheckConstraint("price > 0" ,name ="check-menu_price_positive"), CheckConstraint("quantity >= 0", name="check_menu_quantity_non_negative"),)

    @property
    def is_available(self) -> bool:
        return self.quantity > 0

    



    



