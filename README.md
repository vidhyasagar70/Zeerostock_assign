# Zeerostock MERN Assignment

Production deployment:

- Frontend: https://zeerostock-assign.vercel.app/
- Backend: https://zeerostock-jmrp.onrender.com/

This project uses:

- MongoDB + Mongoose
- Express + Node.js + TypeScript
- React + TypeScript + Vite

## Features

- Inventory search with combined filters: q, category, minPrice, maxPrice
- Supplier and inventory create endpoints with validation
- Grouped inventory aggregation by supplier with total inventory value sorting
- Robust API validation and centralized error handling

## API Endpoints

- GET /health
- GET /search
- POST /supplier
- POST /inventory
- GET /inventory
- GET /inventory/grouped

## Local Setup

1. Start backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

2. Start frontend

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

3. Open app

- http://localhost:5173

Notes:

- In local development, frontend uses Vite proxy /api -> http://localhost:3001.
- Backend seeds initial data automatically if inventory collection is empty.

## Environment Variables

Backend .env:

- PORT=3001
- MONGODB_URI=mongodb://127.0.0.1:27017/zeerostock
- NODE_ENV=development
- CORS_ORIGIN=http://localhost:5173,https://zeerostock-assign.vercel.app,https://*.vercel.app

Frontend .env:

- VITE_API_BASE_URL=https://zeerostock-jmrp.onrender.com

## Deployment Configuration

Render backend:

- Set CORS_ORIGIN to your frontend domains.
- Ensure MONGODB_URI points to your production MongoDB.

Vercel frontend:

- Set VITE_API_BASE_URL=https://zeerostock-jmrp.onrender.com

## Submission Checklist

- Production links are added in this README.
- Env examples are included for backend and frontend.
- Backend CORS allows localhost and Vercel origins.
- Repo is ready to push.
