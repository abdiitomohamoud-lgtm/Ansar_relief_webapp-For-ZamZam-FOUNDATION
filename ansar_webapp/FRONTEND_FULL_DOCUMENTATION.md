# Frontend Full Documentation

This document provides a comprehensive, file-by-file, folder-by-folder technical and functional overview of the entire frontend codebase (`client/src/`).

---

## Table of Contents

- [components/](#components)
- [contexts/](#contexts)
- [pages/](#pages)
- [hooks/](#hooks)
- [services/](#services)
- [utils/](#utils)
- [styles/](#styles)
- [public/](#public)
- [Other Files](#other-files)

---

# components/

## Badge.js

**Purpose:** Renders a styled badge for UI labels or status indicators.

**Key Logic:**

- Receives `children` and optional `className` as props.
- Renders a `<span>` with default and custom classes.

**Example Usage:**

```jsx
<Badge className="bg-green-100 text-green-800">Active</Badge>
```

---

## CartPage.js

**Purpose:** Displays the user's cart, allows quantity changes, removal, and checkout.

**Key Logic:**

- Uses `CartContext` to get cart items and actions.
- Maps over cart items, rendering each with `CartItem`.
- Handles checkout navigation.

**Example Usage:**

```jsx
<CartPage />
```

---

## ErrorBoundary.js

**Purpose:** Catches JavaScript errors in child components and displays a fallback UI.

**Key Logic:**

- Implements `componentDidCatch` and `getDerivedStateFromError`.
- Renders fallback message if error occurs.

**Example Usage:**

```jsx
<ErrorBoundary>
  <SomeComponent />
</ErrorBoundary>
```

---

## HoverSection.js

**Purpose:** UI component for sections that highlight on hover.

**Key Logic:**

- Uses state to track hover.
- Applies different styles on hover.

---

## LoadingSpinner.js

**Purpose:** Shows a loading spinner animation.

**Key Logic:**

- Renders a spinning SVG or CSS animation.

---

## Navbar.js

**Purpose:** Main navigation bar for the app.

**Key Logic:**

- Renders links to main pages.
- Shows login/logout/profile based on auth state.

---

## Programs.js

**Purpose:** Displays a list of programs or initiatives.

**Key Logic:**

- Fetches program data from API or props.
- Maps and renders each program.

---

## Progress.js / ProgressSteps.js

**Purpose:** Visual progress bars and step indicators for multi-step flows.

**Key Logic:**

- Receives current step and total steps as props.
- Renders progress visually.

---

## UrgentNeedDonationModal.js

**Purpose:** Modal for urgent need donations.

**Key Logic:**

- Shows urgent need details and donation form.
- Handles donation submission.

---

# components/donate/

## QuickDonatePanel.js

**Purpose:** UI for quick donations to urgent needs. See previous detailed documentation for full breakdown.

---

# components/common/

- **Purpose:** Shared UI elements (buttons, modals, etc.) used throughout the app.
- **Files:** Button.js, Modal.js, etc.

---

# components/admin/

- **Purpose:** Admin dashboard UI components.
- **Files:** AdminTable.js, AdminSidebar.js, etc.

---

# contexts/

- **CartContext.js:** Manages cart state, provides add/remove/update/clear functions, syncs with backend for logged-in users.
- **AuthContext.js:** Manages authentication state, provides login/logout/register functions.
- **DonationContext.js:** Manages urgent need and donation state.

---

# pages/

- **HomePage.js:** Landing page, shows featured campaigns and projects.
- **CartPage.js:** User's cart and checkout flow.
- **ProfilePage.js:** User profile and settings.
- **AdminDashboard.js:** Admin dashboard overview.
- **Other pages:** About, Contact, Donate, etc.

---

# hooks/

- **useCart.js:** Custom hook for cart actions and state.
- **useAuth.js:** Custom hook for authentication actions and state.
- **useDonation.js:** Custom hook for donation/urgent need logic.

---

# services/

- **cartService.js:** Handles all cart-related API calls (add, remove, update, clear).
- **userService.js:** Handles user authentication and profile API calls.
- **donationService.js:** Handles donation/payment API calls.

---

# utils/

- **formatCurrency.js:** Formats numbers as currency.
- **validators.js:** Input validation helpers.
- **apiHelpers.js:** Helper functions for API requests.

---

# styles/

- **index.css:** Main CSS entry point, imports Tailwind and custom styles.
- **tailwind.config.js:** Tailwind CSS configuration.

---

# public/

- **index.html:** Main HTML template.
- **favicon.ico, manifest.json:** App icons and manifest.
- **assets/:** Images, icons, and static files.

---

# Other Files

- **index.js:** React app entry point, renders `<App />`.
- **App.js:** Main app component, sets up routes and layout.
- **constants.js:** App-wide constants.
- **i18n.js:** Internationalization setup.
- **reportWebVitals.js:** Performance reporting.

---

This document can be expanded with line-by-line or block-by-block explanations for any file or folder as needed. Let me know if you want a deep-dive for a specific file, folder, or feature next.
