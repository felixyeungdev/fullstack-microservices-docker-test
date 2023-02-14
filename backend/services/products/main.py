from fastapi import FastAPI
import uvicorn
import os

PORT = os.environ.get("PORT", "8000")
HOST = os.environ.get("HOST", "0.0.0.0")
DEBUG = True if os.environ.get("DEBUG") else False
PORT = int(PORT)

app = FastAPI()


@app.get("/")
def read_root():
    return {
        "message": f"Hello World from {HOST}",
        "language": "Python",
        "framework": "FastAPI",
        "success": True
    }


if __name__ == "__main__":
    uvicorn.run('main:app', host=HOST, port=PORT, reload=DEBUG)
