class AppException(Exception):
    """Base exception for expected application errors. """
    status_code = 400
    code = "application_error "
    def __init__(self, message:str) -> None:
        self.message = message
        super().__init__(message)


class MenuAlreadyExists(AppException):
    """ Raised when a menu already exists"""
    status_code = 409
    code ="menu_already_exists"

    def __init__(self) -> None:
        super().__init__(" This Menu already exists") 

class MenuNotFound(AppException):
    """Raised when menu not found"""
    status_code = 404

    code = "menu_not_found"

    def __init__(self, )-> None:
        super().__init__("This menu cannot be found")

class MenuItemNotFound(Exception):
    pass

class InvalidPriceError(Exception):
    pass

class InvalidQuantityError(Exception):
    "Raised when quantity is invalid"

    status_code = 409
    code = "invalid_quantity"
    def __init__(self, )->None:
        super().__init__("Quantity must be greater than zero")


class CartNotFound(AppException):
    """Raised when cart is not found"""
    status_code = 404

    code = "cart_not_found"

    def __init__(self, )-> None:
        super().__init__("This cart cannot be found")

class ItemNotFound(Exception):
    pass

class EmailAlreadyRegistered(AppException):
    """ Raised when an email is already registered """
    status_code = 404
    code ="email_already_registered"

    def __init__(self) -> None:
        super().__init__(" An account with this email aready exists") 

class InvalidCredentials(AppException):
    """ Raised when authentication credentials are invalid"""
    status_code = 404
    code ="invalid_credentials"

    def __init__(self) -> None:
        super().__init__(" Authentication credentials are invalid") 
