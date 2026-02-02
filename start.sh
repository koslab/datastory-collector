#!/bin/sh

# Start nginx
nginx -g "daemon off;" &

# Start backend
uv run uvicorn datastory.main:app --host 0.0.0.0 --port 8000
