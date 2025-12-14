#!/bin/bash

set -e

echo "Iniciando..."

# BACKEND
echo "Backend"

cd backend
echo "Dependencia:"
npm install
echo "Dependencias del backend OK"

echo "Prisma generate"
npx prisma generate

echo "Prisma migrate deploy..."
npx prisma migrate deploy

echo "Levantando backend..."
npm start & BACKEND_PID=$!

cd ..

# FRONTEND
echo "Frontend"

cd frontend
npm install

echo "Dependencias del frontend OK"

echo "Levantando frontend..."
npm run dev & FRONTEND_PID=$!

cd ..

echo "-----------------------------------"
echo "Aplicación online"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
wait
