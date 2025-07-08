# GameStore Production Dockerfile
FROM node:18 AS frontend-build

# Frontend build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Backend setup
FROM python:3.9-slim

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend
COPY backend/ .

# Copy frontend build
COPY --from=frontend-build /app/frontend/build ./frontend_build
RUN mkdir -p staticfiles

# Environment
ENV PYTHONUNBUFFERED=1
ENV DEBUG=False

# Collect static files
RUN python manage.py collectstatic --noinput

# Port
EXPOSE 8000

# Start command
CMD ["gunicorn", "gamestore.wsgi:application", "--bind", "0.0.0.0:8000"] 