# Face Recognition Frontend

This is the React + Vite frontend for the face recognition project.

## What it does
- Allows users to **sign in** and **register**
- Sends image URLs to the backend for **face detection**
- Displays face bounding boxes and attributes
- Updates user **entry counts** on every detection

## How It Works

### User Authentication
- **Sign In**: Users enter email/password, validated client-side, sent to backend
- **Registration**: Client-side validation for email format and password strength (min 6 chars)
- **State Management**: User data stored in React Context, persists across page navigation
- **Protected Routes**: Home page requires authentication, redirects to sign-in if not logged in

### Face Detection Flow
1. User enters image URL in the form
2. Frontend calls backend `/api/v1/face/detect` with the URL
3. Backend forwards to Face++ API for detection
4. Results returned with face coordinates and attributes
5. Frontend displays bounding boxes on the image
6. User entry count incremented and updated in UI

### State Management
- **UserContext**: Global user state (id, name, email, entries)
- **Custom Hooks**: `useUser()` for context access, `useFaceDetection()` for detection logic
- **Local State**: Form inputs, loading states, error handling

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

