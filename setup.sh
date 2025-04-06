#!/bin/bash

echo "Setting up FoodyBro for the first time..."

# Step 1: Stop & clean existing containers and volumes
echo "Cleaning up previous Docker containers & volumes..."
docker compose down --volumes

# Step 2: Build all containers
echo "Building backend and mongo..."
docker compose build

# Step 3: Start MongoDB and Backend
echo "Starting services in background..."
docker compose up -d

# Step 4: Wait for backend & DB to initialize
echo "Waiting for services to initialize..."
sleep 10

# Step 5: Seed database
echo "Seeding MongoDB..."
docker compose exec backend npm run seed

echo "Setup complete!"
echo ""
echo "Backend:        http://localhost:8080"
echo "MongoDB:        mongodb://localhost:27017"
echo "Frontend:       run the following manually:"
echo ""
echo "     cd client"
echo "     npm install"
echo "     npm run dev"
echo ""
echo "Your changes to frontend will auto-refresh!"
