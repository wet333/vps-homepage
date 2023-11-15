#!/bin/bash

# Define variables
DOCKER_IMAGE="vps-homepage"
VERSION_TAG="1.0.11"
LATEST_FLAG=true
REPOSITORY="wetagustin/vps-homepage"

# Important!!! - I need this to push to dockerhub, because the terminal
# opened for executing this script is different that where i started it.
docker login 

# Build the Docker image
docker build -t "${DOCKER_IMAGE}:${VERSION_TAG}" .

# Add the tags
docker tag "${DOCKER_IMAGE}:${VERSION_TAG}" "${REPOSITORY}:${VERSION_TAG}"
# Publish the images
docker push "${REPOSITORY}:${VERSION_TAG}"

if [ "$LATEST_FLAG" = true ]; then
    docker tag "${DOCKER_IMAGE}:${VERSION_TAG}" "${REPOSITORY}:latest"
    docker push "${REPOSITORY}:latest"
fi

# Wait for user input
read -p "Press any key to exit..."