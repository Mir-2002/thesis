from pydantic import BaseModel
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .userModel import User

class File(BaseModel):
    user: Optional["User"] = None
    filename: str
    parsed_data: List[dict]