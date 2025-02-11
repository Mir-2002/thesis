from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils.db import client
from routes import userRoutes, fileRoutes
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(userRoutes.router)
app.include_router(fileRoutes.router)

@app.get("/api/check_db_connection")
async def check_db_connection():
    try:
        # Perform a simple operation to check the connection
        client.admin.command('ping')
        return {"message": "Connected to MongoDB"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)