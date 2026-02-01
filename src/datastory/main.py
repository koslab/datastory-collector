from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from datastory.db import create_db_and_tables
from datastory.build import build_frontend

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
    if os.environ.get("DATASTORY_REBUILD_FRONTEND") == "1":
        build_frontend()


from datastory.service.submission.views import router as submission_router

app.include_router(submission_router, prefix="/api/v1")

# Mount static files correctly
# Check for container path first, then local dev path
static_dir = "/app/static"
if not os.path.exists(static_dir):
    # Fallback to local frontend/dist relative to project root
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    static_dir = os.path.join(project_root, "frontend", "dist")

if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

    @app.get("/{full_path:path}")
    async def serve_frontend(request: Request, full_path: str):
        # Skip API routes
        if full_path.startswith("api/") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
            return None # Should be handled by other routers

        # Try to serve the file if it exists in the static dir
        file_path = os.path.join(static_dir, full_path)
        if full_path and os.path.isfile(file_path):
            return FileResponse(file_path)
        
        # Fallback to index.html for SPA routing
        index_path = os.path.join(static_dir, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        
        return {"detail": "Not Found"}
else:
    # Development mode or missing static files
    @app.get("/")
    async def root():
        return {"message": "DataStory API is running. Static files not found at " + static_dir}
