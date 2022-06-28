#!/bin/bash

set -e

wait-for-it.sh 172.21.0.2:3306 -t 30

echo "Server is running, please wait..."
cd /app && npm install && npm run start