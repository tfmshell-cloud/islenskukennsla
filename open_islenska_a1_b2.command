#!/bin/zsh
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"
if ! lsof -i :8000 >/dev/null 2>&1; then
  nohup python3 -m http.server 8000 >/dev/null 2>&1 &
  sleep 0.6
fi
open "http://localhost:8000/islenska_a1_b2.html"
