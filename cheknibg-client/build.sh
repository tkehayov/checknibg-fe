#!/bin/bash

# --- Configuration ---
BUILD_COMMAND="npm run build"
FROM_DIR="./build" # Create React App default output directory
TO_DIR=$1          # **<-- Uses the first argument passed to the script**
# ---------------------

# Check if the required argument (TO_DIR) was passed
if [ -z "$TO_DIR" ]; then
  echo "Error: Target directory (TO_DIR) is missing."
  echo "Usage: ./deploy.sh <target/path/to/deploy>"
  exit 1
fi

echo "Starting project build..."
# 1. Execute the build command
$BUILD_COMMAND

# Check the exit status of the build command
if [ $? -eq 0 ]; then
  echo "Build successful."
  echo "Deploying files from $FROM_DIR to $TO_DIR..."
  
  # 2. Ensure the build directory exists
  if [ ! -d "$FROM_DIR" ]; then
    echo "Error: Build directory ($FROM_DIR) not found. Check build command."
    exit 1
  fi
  
  # 3. Clean up the old target directory (optional but recommended)
  rm -rf "$TO_DIR"
  
  # 4. Copy the build contents
  cp -r "$FROM_DIR" "$TO_DIR"
  
  # Check if the copy was successful
  if [ $? -eq 0 ]; then
    echo "Deployment successful! Files are now located in: $TO_DIR"
  else
    echo "Error: Failed to copy files."
    exit 1
  fi
else
  echo "Error: Build failed. Aborting deployment."
  exit 1
fi