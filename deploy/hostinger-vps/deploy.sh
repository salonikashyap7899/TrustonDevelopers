#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${1:-/var/www/truston1}"
PORT="${PORT:-3000}"

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -d .git ]; then
  echo "Run this script inside the cloned project directory or pass the app path as the first argument."
  exit 1
fi

npm install
npm run build

mkdir -p /var/log/truston1
pm2 startOrRestart "$APP_DIR/deploy/hostinger-vps/ecosystem.config.cjs" --env production
pm2 save
