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

# Install uv and nginx
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

LABEL org.opencontainers.image.source="https://github.com/koslab/datastory-collector"
LABEL org.opencontainers.image.title="DataStory Collector"
LABEL org.opencontainers.image.licenses="AGPL-3.0"

WORKDIR /app

# Copy project definition and lock file
COPY pyproject.toml uv.lock ./

# Copy backend source code
COPY src ./src
COPY README.md ./

# Install the project itself
RUN uv sync --frozen

# Copy built frontend assets to Nginx default public directory
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/sites-available/default

# Copy configuration files
COPY start.sh ./

# Make start script executable
RUN chmod +x start.sh

ADD frontend/src/config.json /app/config.json

# Environment variables
ENV DATASTORY_CONFIG_JSON_PATH="/app/config.json"
ENV VITE_API_BASE_URL="/api/v1"

# Expose ports
EXPOSE 80 8000

# Environment variables
ENV PATH="/app/.venv/bin:$PATH"

CMD ["./start.sh"]
