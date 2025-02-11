from pydantic import BaseModel
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from .fileModel import File

class User(BaseModel):
    uid: str
    username: str
    email: str
    files: List["File"] = []