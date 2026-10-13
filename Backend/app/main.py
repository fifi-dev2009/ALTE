from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler
from app.dependencies.dependency import limiter

from app.router.customer_router import router as customer_router
from app.router.menu_router import router as menu_router
from app.router.cart_router import router as cart_router
from app.router.order_router import router as order_router
from app.config import settings


app = FastAPI()
app.state.limiter = limiter

app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler,)

app.include_router(customer_router)
app.include_router(menu_router)
app.include_router(cart_router)
app.include_router(order_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins= settings.FRONTEND_ORIGINS,
    allow_credentials= True,
    allow_methods= ["*"],
    allow_headers= ["*"]
)


SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}

class OriginValidationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method not in SAFE_METHODS:
            origin = request.headers.get("origin")

            if origin not in settings.FRONTEND_ORIGINS:
                return JSONResponse(
                    status_code=403,
                    content={"detail": "Untrusted request origin"},
                )

        return await call_next(request)


app.add_middleware(OriginValidationMiddleware)

