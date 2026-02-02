#!/bin/sh

# Generate env.js from environment variables starting with VITE_
echo "window.env = window.env || {};" > /usr/share/nginx/html/env.js
env | grep '^VITE_' | while read -r line; do
  name=${line%%=*}
  value=${line#*=}
  echo "window.env.$name = \"$value\";" >> /usr/share/nginx/html/env.js
done

# Start nginx
nginx -g "daemon off;" &

# Start backend
uv run uvicorn datastory.main:app --host 0.0.0.0 --port 8000
