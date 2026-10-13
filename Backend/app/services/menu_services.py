from app.models.menu import MenuItem, Menu
from .exception import MenuItemNotFound, MenuNotFound, MenuAlreadyExists
from app.repositories.menu_reposiory import MenuRepository

from datetime import datetime, timezone
from app.schemas.menu_schema import MenuCreate, MenuItemCreate, MenuItemUpdate
from sqlalchemy.orm import Session

class MenuService:
    def __init__(self, session:Session):
        self.session = session
        self.repository = MenuRepository(session)

    def create_menu(self, menu_data: MenuCreate)-> Menu:
        existing_menu = self.repository.get_menu_by_name(menu_data.name)
        if existing_menu:
            raise MenuAlreadyExists()

        menu = Menu( name = menu_data.name)
        self.repository.create(menu)

        return menu

    def get_menu(self, menu_id: str)-> Menu:
        menu = self.repository.get_menu_by_id(menu_id)

        if not menu :
            raise MenuNotFound()
        return menu
    
    def get_menus(self)-> list[Menu]:
        return self.repository.get_all_menus()

    def create_menu_item(self,menu_id: str, menu_item_data:MenuItemCreate, ):
        self.get_menu(menu_id)

        menu_item = MenuItem(
            menu_id = menu_id,
            name= menu_item_data.name,
            price = menu_item_data.price,
            quantity = menu_item_data.quantity,
            description = menu_item_data.description

        )

        self.repository.create_menu_item(menu_item)
        return menu_item

    def get_all_menu_items(self)-> list[MenuItem]:
        return self.repository.get_all_menu_item()

    def get_items_by_menu(self, menu_id:str)-> list[MenuItem]:
        existing_menu = self.repository.get_menu_by_id(menu_id)
        if not existing_menu :
            raise MenuNotFound()

        return self.repository.get_items_by_menu(menu_id)

    def get_menu_item_by_id(self, menu_item_id: str)-> MenuItem :
        menu_item = self.repository.get_menu_item_by_id(menu_item_id)

        return menu_item

    def update_item(self, item_id, update_data:MenuItemUpdate)-> MenuItem:
        existing_item = self.repository.get_menu_item_by_id(item_id)
        if not existing_item:
            raise MenuItemNotFound()

        updated_data = update_data.model_dump(exclude_unset = True)
        for field, value in updated_data.items():
            setattr(existing_item, field, value)

        return self.repository.update_menu_item(existing_item)

    def delete_item(self, item_id: str)-> MenuItem:
        menu_item = self.repository.get_menu_item_by_id(item_id)
        if not menu_item:
            raise MenuItemNotFound()
        now = datetime.now(timezone.utc)
        menu_item.deleted_at = now

        return self.repository.delete_menu_item(menu_item)