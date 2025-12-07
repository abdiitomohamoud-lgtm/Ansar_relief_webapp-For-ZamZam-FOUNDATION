# Admin2 Component System

## Overview

A modern, modular, accessible, and responsive admin dashboard system with role-based UI customization.

## Key Components

- `AdminLayout`: Main wrapper (Sidebar, Topbar, Content)
- `Sidebar`: Role-based navigation
- `Topbar`: User info, notifications, dark mode
- `RoleGuard`: Restricts UI by role
- `Dashboard`: Example page

## Accessibility

- All interactive elements have ARIA labels, keyboard navigation, and focus states
- Color contrast and font sizes meet WCAG 2.1 AA+
- Responsive layouts for all breakpoints

## Role-Based UI

- Sidebar and Topbar show/hide items by user role
- `RoleGuard` wraps sensitive UI

## Extending for New Roles/Features

- Add new roles to `NAV_ITEMS` in `Sidebar.js`
- Use `RoleGuard` to protect new components/pages
- Update `useRole` to integrate with your auth system

## Testing

- Unit tests for all components (see `__tests__/RoleGuard.test.js`)
- Accessibility tests recommended (axe, Lighthouse)
- E2E tests for flows (Cypress/Playwright)

## Example Usage

```jsx
import AdminLayout from "./components/AdminLayout";
import { RoleGuard } from "./components/RoleGuard";

<AdminLayout>
  <RoleGuard allowedRoles={["admin"]}>
    <SecretAdminPanel />
  </RoleGuard>
</AdminLayout>;
```
