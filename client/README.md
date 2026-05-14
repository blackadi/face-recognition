# Face Recognition Frontend

This is the React + Vite frontend for the face recognition project.

## What it does
- Allows users to **sign in** and **register**
- Sends image URLs to the backend for **face detection**
- Displays face bounding boxes and attributes
- Updates user **entry counts** on every detection

## Project structure
- `src/main.jsx` — app entry point
- `src/config/router.jsx` — React Router route setup
- `src/layouts/Layout.jsx` — app layout and navigation wrapper
- `src/context/UserContext.jsx` — global user state
- `src/pages/` — page components for routes
- `src/hooks/` — reusable hooks and business logic
- `src/utils/authService.js` — authentication and user API calls

## Run locally

```sh
cd client
npm install
npm run dev
```

## Build for production

```sh
npm run build
```

## Environment

Edit `client/.env` for frontend configuration. Example values:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_FACEPLUSPLUS_API_KEY=your_faceplusplus_api_key
VITE_FACEPLUSPLUS_API_SECRET=your_faceplusplus_api_secret
```

## Additional docs
- `PROJECT_STRUCTURE.md` — frontend directory and architecture guide
- `DEVELOPER_GUIDE.md` — usage patterns and common development tasks

## Notes
- `App.jsx` is deprecated after routing was added; the app now uses `src/config/router.jsx`.
- User state is managed with `UserContext` and accessed via `useUser()`.
- Face detection logic is extracted into `src/hooks/useFaceDetection.js`.

## Related repositories
- Backend API lives in `../face_api`
- Database setup lives in `../database`

