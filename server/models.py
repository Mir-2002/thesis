from pydantic import BaseModel
from typing import List

class User(BaseModel):
    uid: str
    username: str
    email: str

class FileData(BaseModel):
    user: User
    filename: str
    parsed_data: List[dict]