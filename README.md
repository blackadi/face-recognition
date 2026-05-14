# Face Recognition App

A full-stack face recognition project with:
- **Backend**: Node.js, Express, PostgreSQL, Sequelize
- **Frontend**: React, Vite, React Router
- **Face detection**: Face++ API integration

## Repository layout
- `client/` — React frontend app
- `face_api/` — Express backend API
- `database/` — PostgreSQL Docker compose and initialization scripts

## Quick start

1. Start the database:
   ```sh
   cd database
   docker compose up -d
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start backend only:
   ```sh
   npm run server
   ```

4. Start frontend only:
   ```sh
   npm run client
   ```

5. Start both frontend and backend together:
   ```sh
   npm run dev
   ```

## Root package scripts

- `npm run install-client` — install frontend dependencies
- `npm run install-server` — install backend dependencies
- `npm run install` — install both frontend and backend
- `npm run server` — start backend in watch mode
- `npm run client` — start frontend in dev mode
- `npm run dev` — start both backend and frontend in parallel

## Notes
- Backend API is expected at `http://localhost:3000`
- Frontend Vite server usually runs on `http://localhost:5173`
- Frontend config is stored in `client/.env`

## Useful files
- `client/README.md` — frontend app documentation
- `client/PROJECT_STRUCTURE.md` — frontend directory and architecture guide
- `client/DEVELOPER_GUIDE.md` — frontend developer reference
- `database/docker-compose.yml` — database service definition
- `face_api/src/config/database.js` — backend DB connection
- `face_api/src/routes/` — backend API route definitions
