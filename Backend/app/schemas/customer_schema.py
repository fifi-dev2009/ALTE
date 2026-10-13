from pydantic import BaseModel, EmailStr, ConfigDict, Field


class CustomerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str = Field(min_length= 8, max_length= 128)

class CustomerUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None

class CustomerLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

class CustomerResponse(BaseModel):
    id: str
    name:str
    email: EmailStr
    phone:str

    model_config = ConfigDict (from_attributes=True)


