@echo off

start cmd /k "cd backend && venv\Scripts\activate && python -m app.main"
start cmd /k "cd frontend && npm start"
