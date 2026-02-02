import json
import os
from fastapi import APIRouter, HTTPException
from datastory.config import settings

router = APIRouter(tags=["config"])

@router.get("/config")
async def get_config():
    config_path = settings.config_json_path
    
    # Check if file exists
    if not os.path.exists(config_path):
        # Fallback to default if not found
        # Look for it in the frontend/src directory as fallback
        from pathlib import Path
        project_root = Path(__file__).parent.parent.parent.parent.parent
        fallback_path = project_root / "frontend" / "src" / "config.json"
        
        if fallback_path.exists():
            config_path = str(fallback_path)
        else:
            raise HTTPException(status_code=404, detail=f"Configuration file not found at {config_path} and fallback {fallback_path} not found")

    try:
        with open(config_path, "r") as f:
            config_data = json.load(f)
        
        # Inject API base URL
        config_data["api_base_url"] = settings.api_base_url
        
        return config_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading configuration: {str(e)}")
