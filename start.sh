#!/bin/sh

# Start backend
uv run uvicorn datastory.main:app --host 0.0.0.0 --port 8000
