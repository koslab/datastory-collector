#!/bin/sh

# Start backend in background
uv run uvicorn datastory.main:app --host 0.0.0.0 --port 8000 &

# Start nginx in foreground
nginx -g "daemon off;"
