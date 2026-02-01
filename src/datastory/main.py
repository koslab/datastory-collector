from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datastory.db import create_db_and_tables

app = FastAPI(title="DataStory API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


from datastory.service.submission.views import router as submission_router

app.include_router(submission_router, prefix="/api/v1")
