#!/bin/bash

# Define variables
DOCKER_IMAGE="vps-homepage"
TAG="1.0.0"
REPOSITORY="wetagustin/vps-homepage"

# Build the Docker image
docker build -t "${DOCKER_IMAGE}:${TAG}" .

# Tag the Docker image
docker tag "${DOCKER_IMAGE}:${TAG}" "${REPOSITORY}:${TAG}"

# Publish the Docker image
docker push "${REPOSITORY}:${TAG}"

# Wait for user input
read -p "Press any key to exit..."