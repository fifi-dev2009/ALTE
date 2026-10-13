
from fastapi import APIRouter, Depends, Response, status, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.menu import Menu, MenuItem

from app.schemas.menu_schema import MenuCreate, MenuResponse, MenuItemCreate, MenuItemResponse, MenuItemUpdate
from app.services.menu_services import MenuService
from app.services.exception import MenuAlreadyExists, MenuNotFound, MenuItemNotFound

router = APIRouter(tags=["Menu"])

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

def get_menu_service(session: Session = Depends(get_db), )-> MenuService:
    return MenuService(session)

@router.post("/menus", response_model= MenuResponse, status_code= status.HTTP_201_CREATED)
def create_menu(menu_data: MenuCreate,service: MenuService = Depends(get_menu_service) , )-> MenuResponse:
    try:
        menu =  service.create_menu(menu_data)
        return menu
    except MenuAlreadyExists:
         raise HTTPException(
            status_code= status.HTTP_409_CONFLICT, detail="This menu already exists."
        )
        
@router.get("/menu/{menu_id}", response_model= MenuResponse) 
def get_specific_menu(menu_id: str, service: MenuService = Depends(get_menu_service))-> MenuResponse:
    try: 
      return service.get_menu(menu_id)  
    except MenuNotFound:
        raise HTTPException(
            status_code= status.HTTP_404_NOT_FOUND, detail= " Menu not found"
        )


@router.get("/menus", response_model= list[MenuResponse], )
def get_all_menu(service: MenuService= Depends(get_menu_service), )-> list[MenuResponse]:
    return service.get_menus()

@router.post("/menus/{menu_id}/items",response_model= MenuItemResponse, status_code= status.HTTP_201_CREATED )
def create_menu_item(menu_id: str, menu_item_data: MenuItemCreate, service: MenuService = Depends(get_menu_service))-> MenuItemResponse:
    try:
        menu_item =  service.create_menu_item(menu_id, menu_item_data)
        return menu_item
    except MenuItemNotFound:
         raise HTTPException(
             status_code= status.HTTP_409_CONFLICT, detail="Menu Items Not Found"
         )
    


@router.get("/menu_items", response_model=list[MenuItemResponse])
def get_all_menu_items(service:MenuService = Depends(get_menu_service))->list[MenuItemResponse]:
    return service.get_all_menu_items()


@router.get("/menus/{menu_id}/items", response_model=list[MenuItemResponse])
def get_specific_men_item(menu_id: str, service:MenuService = Depends(get_menu_service))->list[MenuItemResponse]:
    return service.get_items_by_menu(menu_id)

@router.patch("/menu-items/{item_id}", response_model= MenuItemResponse, status_code=status.HTTP_200_OK)
def update_menu_item(update_data:MenuItemUpdate, item_id: str, service:MenuService= Depends(get_menu_service))-> MenuItemResponse:
    return service.update_item(update_data,item_id)

@router.delete("/menu-items/{item_id}",  status_code=status.HTTP_204_NO_CONTENT)
def delete_menu_item(item_id: str, service:MenuService= Depends(get_menu_service)):
    return service.delete_item(item_id)

