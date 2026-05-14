# Face Recognition App - Project Structure Guide

## Overview
This project has been refactored to follow modern Vite and React best practices with proper separation of concerns, routing, and state management.

## Directory Structure

### `src/pages/` - Page Components
Each page represents a route in the application:
- **Home.jsx** - Main face detection page (protected route)
  - Shows face recognition interface
  - Requires user authentication
  - Uses `useFaceDetection` hook for logic

- **SignIn.jsx** - User authentication page
  - Form for user sign in
  - Redirects to home on successful auth

- **Register.jsx** - User registration page
  - Form for new user registration
  - Redirects to home on successful registration

- **NotFound.jsx** - 404 error page
  - Shown for invalid routes

### `src/layouts/` - Layout Components
- **Layout.jsx** - Main application layout
  - Wraps all pages
  - Contains Navigation component
  - Manages route navigation

### `src/components/` - Reusable Components
Existing components (no changes needed):
- **Navigation/** - Navigation bar
- **Logo/** - Logo component
- **Rank/** - User rank display
- **FaceRecognition/** - Face detection display
- **ImageLinkForm/** - URL input form
- **Signin/** - Sign in form
- **Register/** - Registration form

### `src/hooks/` - Custom Hooks
- **useUser.js** - Access UserContext
  ```javascript
  const { user, loadUser, updateEntries, clearUser } = useUser();
  ```

- **useFaceDetection.js** - Face detection logic
  ```javascript
  const {
    imageUrl,
    setImageUrl,
    faces,
    faceAttributes,
    displaySize,
    loading,
    error,
    imgRef,
    handleImageLoad,
    detectFaces,
    resetFaceDetection,
  } = useFaceDetection();
  ```

- **requests.js** - API calls (existing)
- **useUsers.js** - User management (existing)

### `src/context/` - React Context
- **UserContext.jsx** - User state management
  - Manages user data globally
  - Provides: `user`, `loadUser()`, `updateEntries()`, `clearUser()`
  - Wrap app with `<UserProvider>`

### `src/config/` - Configuration
- **api.js** - API URL configuration
  ```javascript
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
  ```

- **router.jsx** - React Router configuration
  - Defines all routes
  - Sets up Layout wrapper
  - Handles 404 errors

### `src/utils/` - Utility Functions
- **authService.js** - Authentication API calls
  - `signInUser(email, password)`
  - `registerUser(name, email, password)`
  - `updateUserEntries(userId)`

### Root Files
- **main.jsx** - Application entry point
  - Sets up providers: UserProvider, RouterProvider
  - Imports global styles

- **App.jsx** - Deprecated
  - No longer used (kept for reference)

## Data Flow

### User Authentication
```
SignIn Component → signInUser() → UserContext → Home Page
                   ↓
            User stored in context
```

### Face Detection
```
Home Page (useUser) → useFaceDetection() → API Call
                     ↓
              Update entries via context
```

## Key Patterns

### Protected Routes
```javascript
// In Home.jsx
useEffect(() => {
  if (!user.id) navigate("/signin");
}, [user.id, navigate]);
```

### Global User State
```javascript
const { user, loadUser, updateEntries } = useUser();
```

### API Calls
```javascript
import { signInUser, registerUser } from "../utils/authService";
```

## Environment Variables
File: `.env`
```
VITE_API_URL=http://localhost:3000/api/v1
VITE_FACEPLUSPLUS_API_KEY=your_key
VITE_FACEPLUSPLUS_API_SECRET=your_secret
```

## Running the App

### Development
```bash
cd client
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Best Practices Implemented

✅ **Separation of Concerns**
- Pages handle routing and page-level logic
- Components are reusable
- Hooks encapsulate complex logic
- Context handles global state

✅ **Modern React**
- Functional components only
- Hooks for state management
- Context API for global state
- React Router v6 for routing

✅ **Code Organization**
- Clear directory structure
- Logical file naming
- Single responsibility principle

✅ **Performance**
- Route-based code splitting
- Memoized callbacks in hooks
- Efficient re-renders

✅ **Maintainability**
- Easy to add new pages
- Easy to extend hooks
- Clear API boundaries
- Environment-based configuration

## Future Improvements

- [ ] Add error boundary component
- [ ] Implement loading skeleton screens
- [ ] Add form validation library (React Hook Form)
- [ ] Add state persistence (localStorage)
- [ ] Add unit tests
- [ ] Add E2E tests (Cypress/Playwright)
- [ ] Add TypeScript for type safety
