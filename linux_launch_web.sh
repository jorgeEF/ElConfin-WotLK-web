#!/bin/bash

# Crear una nueva sesión para el backend
tmux new-session -d -s web_backend "cd backend; npm run start"

# Crear una nueva sesión para el frontend
tmux new-session -d -s web_frontend "cd frontend; npx serve -s dist -l 80"