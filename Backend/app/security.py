from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone

from jose import  jwt

from app.database import settings

password_hash = PasswordHash.recommended()

def hash_password(password:str) -> str:
    return password_hash.hash(password)

def verify_password(plain_password:str, password_hash_value:str) -> bool:
    return password_hash.verify(plain_password, password_hash_value)

def create_access_token(data:dict,)->str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp":expire})

    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm =settings.ALGORITHM)


