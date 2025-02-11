from fastapi import HTTPException, UploadFile
from utils.db import db
from utils.parser import parse_python_file

async def upload_single_file(file: UploadFile):
    if not file:
        raise HTTPException(status_code=400, detail="No file part")
    if file.filename == '':
        raise HTTPException(status_code=400, detail="No selected file")

    try:
        file_content = await file.read()
        file_content = file_content.decode("utf-8")
        parsed_data = parse_python_file(file_content)
        db.parsed_files.insert_one({
            "filename": file.filename,
            "parsed_data": parsed_data
        })
        return {"message": "File processed and metadata stored successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))