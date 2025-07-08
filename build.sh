#!/bin/bash

echo "🎮 GameStore Build Script Başlıyor..."

# Frontend build
echo "📦 Frontend build ediliyor..."
cd frontend
npm ci
npm run build
cd ..

# Backend setup
echo "🔧 Backend hazırlanıyor..."
cd backend
pip install -r requirements.txt

# Django setup
echo "🗃️ Database migrate..."
python manage.py migrate --noinput

echo "📁 Static files collect..."
python manage.py collectstatic --noinput

echo "✅ Build tamamlandı!"
echo "🚀 GameStore deployment hazır!" 