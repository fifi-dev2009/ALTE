from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.menu import Menu, MenuItem
from datetime import datetime, timezone

class MenuRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, menu:Menu)-> Menu:
       self.session.add(menu) 
       self.session.commit()
       self.session.refresh(menu)

       return menu

    def get_menu_by_id(self, menu_id: str) -> Menu | None:
        statement = self.session.execute(select(Menu).where(Menu.id == menu_id))
        
        return statement.scalar_one_or_none()

    def get_menu_by_name(self, name:str)-> Menu | None:
        statetement = self.session.execute(select(Menu).where(Menu.name == name))

        return  statetement.scalar_one_or_none()


    def get_all_menus(self) -> list[Menu] :
        statement = self.session.execute(select(Menu))

        return list(statement.scalars().all())

    def create_menu_item(self, menu_item: MenuItem) -> MenuItem:
        self.session.add(menu_item)
        self.session.commit()
        self.session.refresh(menu_item)

        return menu_item

    def get_menu_item_by_id(self, item_id: str) -> MenuItem | None:
        statement = self.session.execute(select(MenuItem).where(MenuItem.id == item_id))

        return statement.scalar_one_or_none()

    def get_items_by_menu(self, menu_id: str) -> list[MenuItem]:
        statement = self.session.execute(select(MenuItem).where(MenuItem.menu_id == menu_id))

        return list(statement.scalars().all())

    def get_all_menu_item(self)-> list[MenuItem]:
        statement = self.session.execute(select(MenuItem).where(MenuItem.deleted_at.is_(None),))

        return list(statement.scalars().all())

    def update_menu_item(self, menu_item: MenuItem) -> MenuItem:
        self.session.commit()
        self.session.refresh(menu_item)

        return menu_item

    def delete_menu_item(self, menu_item: MenuItem) ->MenuItem:
        menu_item.deleted_at = datetime.now(timezone.utc)
        self.session.commit()
        self.session.refresh(menu_item)
        return menu_item

    def get_available_menu_items(self, menu_id: str) -> list[MenuItem]:
        statement = select(MenuItem).where(MenuItem.menu_id == menu_id,MenuItem.quantity > 0,MenuItem.deleted_at.is_(None) )

        return list(self.session.scalars(statement).all())
