# Quick Start Guide for Developers

## Project Structure Overview

This is a modern React app using:
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Context API** - Global state management
- **Custom Hooks** - Logic extraction and reusability

## File Locations

### I want to add a new page/route
1. Create component in `src/pages/YourPage.jsx`
2. Add route to `src/config/router.jsx`
3. Add navigation link in `src/layouts/Layout.jsx`

**Example:**
```javascript
// src/pages/Analytics.jsx
import { useUser } from "../hooks/useUser";

export default function Analytics() {
  const { user } = useUser();
  return <div>Analytics for {user.name}</div>;
}

// Then add to router.jsx:
{
  path: "/analytics",
  element: <AnalyticsPage />,
}
```

### I want to add a new component
1. Create folder in `src/components/ComponentName/`
2. Create `ComponentName.jsx` and `ComponentName.css`
3. Export from `src/components/index.js` (if created)

### I want to share state across pages
Use the UserContext hook:
```javascript
import { useUser } from "../hooks/useUser";

function MyComponent() {
  const { user, loadUser, updateEntries } = useUser();
  return <div>{user.name}</div>;
}
```

### I want to handle API calls
Add to `src/utils/authService.js`:
```javascript
export const myApiCall = async (data) => {
  const response = await fetch(`${API_URL}/endpoint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
```

Then use in components:
```javascript
import { myApiCall } from "../utils/authService";

const data = await myApiCall(payload);
```

### I want to add client-side validation
Use the pattern from `registerUser` in `authService.js`:
```javascript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  throw new Error("Invalid email format");
}

// Password strength
if (password.length < 6) {
  throw new Error("Password must be at least 6 characters long");
}
```

### I want to create a custom hook
1. Create `src/hooks/useMyHook.js`
2. Follow the pattern from `useFaceDetection.js`
3. Export the hook
4. Use in components

**Example:**
```javascript
import { useState, useCallback } from "react";

export function useMyHook() {
  const [state, setState] = useState(null);
  
  const doSomething = useCallback(() => {
    // logic here
  }, []);
  
  return { state, doSomething };
}
```

### I want to make an API request
1. Use the centralized API URL:
```javascript
import API_URL from "../config/api";
```

2. Or use service functions:
```javascript
import { signInUser } from "../utils/authService";
const user = await signInUser(email, password);
```

## Important Files

| File | Purpose |
|------|---------|
| `src/main.jsx` | Entry point - sets up providers |
| `src/config/router.jsx` | All routes defined here |
| `src/layouts/Layout.jsx` | Main layout wrapper |
| `src/context/UserContext.jsx` | Global user state |
| `src/config/api.js` | API URL config |
| `src/utils/authService.js` | API service calls |

## Common Tasks

### Redirect user after login
```javascript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/"); // Go to home
```

### Check if user is logged in
```javascript
const { user } = useUser();
if (!user.id) navigate("/signin");
```

### Update user data
```javascript
const { updateEntries } = useUser();
updateEntries(newCount);
```

### Handle form submission
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await apiCall(formData);
    // handle success
  } catch (error) {
    // handle error
  }
};
```

## Debugging

### Check what's rendered
Use React Developer Tools browser extension

### Check API calls
Look in Network tab of browser DevTools

### Check state
Use `useUser()` hook in any component to see current user state

### Common errors

**"useUser must be used within UserProvider"**
- Make sure the component tree includes `<UserProvider>` in main.jsx ✓ (Already set up)

**"Cannot find module"**
- Check import paths use correct extension: `.js` or `.jsx`

**Routing not working**
- Check route is defined in `src/config/router.jsx`
- Check path matches what you're navigating to

## Performance Tips

- Keep components small and focused
- Use `useCallback` for function props
- Use `useMemo` for expensive computations
- Lazy load components if needed:
```javascript
const Home = lazy(() => import("../pages/Home"));
```

## Next Steps

- [ ] Add loading states to all API calls
- [ ] Add error handling to all API calls
- [ ] Add form validation
- [ ] Add unit tests
- [ ] Add TypeScript types
- [ ] Improve error messages
