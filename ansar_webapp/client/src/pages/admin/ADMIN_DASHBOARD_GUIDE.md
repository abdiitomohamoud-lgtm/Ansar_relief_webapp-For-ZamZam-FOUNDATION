# Admin Dashboard User Guide

## Overview

The Admin Dashboard provides a secure, dynamic, and modular interface for managing users, content, messages, and site settings. It is accessible only to users with the `admin` role.

## Features

- **Dashboard Overview:** View analytics, user stats, and content summary.
- **User Management:** List, search, create, update, and delete users. Assign roles and view activity logs.
- **Content Management:** Manage campaigns, products, and articles with full CRUD support.
- **Messages/Feedback:** View and respond to user messages and feedback.
- **Settings/Preferences:** Configure site and user settings, including theme and language.
- **Authentication & Authorization:** Secure login/logout, JWT-based role checks, and protected routes.

## Navigation

- Use the sidebar to switch between dashboard sections.
- The topbar provides quick access to user info, dark mode, and notifications.

## Extending the Dashboard

- Add new pages or components in the `admin` folders.
- Use provided hooks and services for API integration.
- All components are styled with TailwindCSS and support dark mode.

## Security

- Only authenticated admin users can access `/admin` routes.
- All API requests require a valid JWT token with admin privileges.

## Support

For more details, see the code comments and README files in each folder.
