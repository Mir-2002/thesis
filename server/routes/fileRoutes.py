from fastapi import APIRouter, UploadFile, File
from controller.fileController import upload_single_file

router = APIRouter()

@router.post("/api/files")
async def upload_file(file: UploadFile = File(...)):
    return await upload_single_file(file)