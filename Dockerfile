# Stage 1: Build Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
# Copy package files first for better caching
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend & Final Image
FROM python:3.13-slim

# Install system dependencies
RUN apt-get update && apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/* && \
    ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

LABEL org.opencontainers.image.source="https://github.com/koslab/datastory-collector"
LABEL org.opencontainers.image.title="DataStory Collector"
LABEL org.opencontainers.image.licenses="AGPL-3.0"

WORKDIR /app

# Copy project definition and lock file
COPY pyproject.toml uv.lock ./

# Copy backend source code
COPY src ./src
COPY README.md ./

# Install the project itself (editable or not)
# uv sync installs the project in editable mode if it finds the source, but we copied it.
RUN uv sync --frozen

# Copy built frontend assets
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh ./

# Make start script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 80

# Environment variables
# Ensure the venv is on the path so we can just run `uvicorn` or `python` if needed, 
# although `uv run` handles this too.
ENV PATH="/app/.venv/bin:$PATH"

CMD ["./start.sh"]
