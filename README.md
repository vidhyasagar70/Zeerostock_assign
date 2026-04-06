# Zeerostock MERN Assignment Solution

This project now uses a full MERN direction:

- MongoDB + Mongoose
- Express + Node.js
- React + TypeScript

## Run Locally

1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend calls backend via `/api` proxy in Vite.

## Backend Architecture (Senior MVC)

Layered structure inside `backend/src`:

- `config`: environment + MongoDB connection
- `models`: Mongoose schemas (`Supplier`, `Inventory`)
- `validators`: zod payload/query validation
- `services`: business logic (`inventorySearchService`)
- `controllers`: request orchestration and response mapping
- `routes`: route definitions per domain
- `middlewares`: error and not-found handlers
- `seed`: initial data seeding for local development
- `utils`: async wrapper and custom API error

Key APIs:

- `GET /search`
- `POST /supplier`
- `POST /inventory`
- `GET /inventory`
- `GET /inventory/grouped`

Rules enforced:

- Case-insensitive search
- Combined filters (`q`, `category`, `minPrice`, `maxPrice`)
- Quantity >= 0
- Price > 0
- Inventory must belong to a valid supplier

Required grouped query implemented:

- `GET /inventory/grouped`
- Group by supplier
- Sort by total inventory value (`quantity * price`) descending

## Frontend Architecture (Senior Modular)

Layered structure inside `frontend/src`:

- `api/httpClient.ts`: centralized Axios instance + interceptors
- `api/searchApi.ts`: domain API abstraction
- `hooks/useInventorySearch.ts`: state + validation + orchestration
- `components/*`: presentational, reusable UI pieces
- `types/*`: shared TypeScript interfaces

Axios interceptor setup includes:

- Request interceptor adds `x-request-id`
- Response interceptor normalizes API errors

UI includes:

- Search input, category filter, min/max price
- Empty state and error state
- Search results table

## MongoDB Schema

Supplier collection:

- `_id`
- `name`
- `city`

Inventory collection:

- `_id`
- `supplier_id` (ObjectId ref to supplier)
- `product_name`
- `category`
- `quantity`
- `price`

Relationship:

- One supplier to many inventory items

## Optimization Suggestion

For large datasets, add pagination and caching:

- Cursor-based pagination for `/search`
- Redis cache for hot filter combinations
- Keep indexes on `supplier_id`, `price`, `category`, and text index on `product_name`
