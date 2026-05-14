# Face API Backend

This is the backend API for the Face Recognition project.

## What it does
- Provides user registration and sign-in
- Stores users in PostgreSQL via Sequelize
- Tracks user entry counts
- Calls Face++ for face detection via `/api/v1/face/detect`

## Quick start

```sh
cd face_api
npm install
npm run dev
```

## Backend scripts

- `npm run dev` — start the backend in watch mode
- `npm start` — run the backend once

## Environment

Create or update `face_api/.env` with:

```env
POSTGRES_DB=face-recognition
POSTGRES_USER=admin
POSTGRES_PASSWORD=Test1234
DB_HOST=localhost
DB_PORT=5432

PORT=3000

FACE_API_KEY=your_faceplusplus_api_key
FACE_API_URL=https://api-us.faceplusplus.com/facepp/v3/detect
FACE_API_SECRET=your_faceplusplus_api_secret
```

## API routes

- `POST /api/v1/users/register` — register a new user
- `POST /api/v1/users/signin` — sign in existing user
- `GET /api/v1/users/profile/:id` — get user profile
- `PUT /api/v1/users/image` — increment user entry count
- `POST /api/v1/face/detect` — detect faces using Face++

## Useful files

- `src/app.js` — Express app configuration
- `src/server.js` — server bootstrap
- `src/config/database.js` — Sequelize database configuration
- `src/routes/api_v1.js` — top-level API router
- `src/routes/users/` — user routes and controller
- `src/routes/face_plusplus/` — Face++ detection route
- `src/models/` — Sequelize models and database logic

## Notes

- The backend is expected to run on `http://localhost:3000`.
- The frontend uses `VITE_API_URL` to connect to this backend.
