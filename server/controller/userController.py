from fastapi import HTTPException
from models.userModel import User
from utils.db import db

async def add_user(user: User):
    if not user.uid or not user.username or not user.email:
        raise HTTPException(status_code=400, detail="Invalid data")

    try:
        db.users.insert_one({
            "_id": user.uid,
            "username": user.username,
            "email": user.email
        })
        return {"message": "User added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_user(id: str):
    try:
        user = db.users.find_one({"_id": id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))