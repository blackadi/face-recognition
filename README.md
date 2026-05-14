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

2. Start the backend API:
   ```sh
   cd face_api
   npm install
   npm run dev
   ```

3. Start the frontend app:
   ```sh
   cd client
   npm install
   npm run dev
   ```

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
