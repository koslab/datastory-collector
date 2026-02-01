import subprocess
import os
import sys
from pathlib import Path

def build_frontend():
    """
    Build the frontend using npm run build.
    Expects 'frontend' directory to be at the project root.
    """
    # Find project root (assume this file is in src/datastory/build.py)
    project_root = Path(__file__).parent.parent.parent
    frontend_dir = project_root / "frontend"
    
    if not frontend_dir.exists():
        print(f"Frontend directory not found at {frontend_dir}. Skipping build.")
        return

    print(f"Building frontend in {frontend_dir}...")
    try:
        # Run npm run build
        # We use shell=True on Windows, but this is Linux. Still, it's safer to use the full path if needed or just npm.
        result = subprocess.run(
            ["npm", "run", "build"],
            cwd=frontend_dir,
            check=True,
            capture_output=True,
            text=True
        )
        print("Frontend build successful.")
        # print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Frontend build failed with exit code {e.returncode}:", file=sys.stderr)
        print(e.stderr, file=sys.stderr)
    except FileNotFoundError:
        print("npm command not found. Please install Node.js and npm.", file=sys.stderr)
