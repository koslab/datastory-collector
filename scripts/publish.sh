#!/bin/bash

# Exit on error
set -e

# Image name
IMAGE_NAME="ghcr.io/koslab/datastory-collector:latest"

echo "Building Docker image: $IMAGE_NAME..."
docker build -t "$IMAGE_NAME" .

echo "Pushing Docker image: $IMAGE_NAME..."
docker push "$IMAGE_NAME"

echo "Successfully built and pushed $IMAGE_NAME"
