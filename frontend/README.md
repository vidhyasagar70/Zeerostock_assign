# Zeerostock Frontend

Deployed URL:

- https://zeerostock-assign.vercel.app/

## Tech Stack

- React 19
- TypeScript
- Vite
- Axios

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
copy .env.example .env
```

3. Start development server:

```bash
npm run dev
```

App runs at http://localhost:5173.

## Environment Variable

- VITE_API_BASE_URL

Examples:

- Local with backend proxy fallback: leave empty and Vite /api proxy will be used.
- Production direct API call: VITE_API_BASE_URL=https://zeerostock-jmrp.onrender.com

## Build

```bash
npm run build
```

## Deploy (Vercel)

Set this environment variable in Vercel project settings:

- VITE_API_BASE_URL=https://zeerostock-jmrp.onrender.com
