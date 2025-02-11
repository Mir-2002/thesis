from fastapi import APIRouter
from controller.userController import add_user, get_user
from models.userModel import User

router = APIRouter()

@router.post("/api/users")
async def create_user(user: User):
    return await add_user(user)

@router.get("/api/users/{id}")
async def read_user(id: str):
    return await get_user(id)