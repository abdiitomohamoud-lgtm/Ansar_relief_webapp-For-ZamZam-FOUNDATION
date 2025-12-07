# Routes Organization

This directory contains the route definitions for the application. The routes are organized in a modular way to improve maintainability and readability.

## Files

- `index.js` - Main routes file that combines all routes and is imported by App.js
- `sponsorshipRoutes.js` - Routes related to sponsorship features
- `projectRoutes.js` - Routes related to project features

## Route Structure

The application uses React Router v6 for routing. The main layout is defined in `Layout.js` and all routes are nested within it.

## Adding New Routes

To add new routes:

1. For general routes, add them directly to `index.js`
2. For feature-specific routes:
   - If they belong to an existing feature module (like sponsorships or projects), add them to the appropriate route file
   - If they represent a new feature area, create a new route file (e.g., `donationRoutes.js`) and import it in `index.js`

## Protected Routes

Protected routes that require authentication are wrapped with the `ProtectedRoute` component from `components/auth/ProtectedRoute.js`.

## Notes

- Routes are organized by feature area for better maintainability
- Each route file exports an array of Route components that are imported and used in the main routes file
- The main routes file is imported in App.js and rendered within the `Routes` component
