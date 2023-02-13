from fastapi import FastAPI
import uvicorn
import os

PORT = os.environ.get("PORT", "8000")
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(PORT)

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": f"Hello World from {HOST}", "success": True}


if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
