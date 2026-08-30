from fastapi import FastAPI

app = FastAPI(title="ContestHub API")


@app.get("/")
def root():
    return {"message": "Welcome to ContestHub API"}
