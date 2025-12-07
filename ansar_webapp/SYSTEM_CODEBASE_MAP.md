# System Codebase Map & Major Components

## 1. Directory Structure Overview

```
- admin_dashboard_code_full.md
- client/
    - src/
        - components/
        - contexts/
        - pages/
        - hooks/
        - services/
        - utils/
        - styles/
        - ...
    - public/
    - package.json
    - ...
- server/
    - src/
        - controllers/
        - models/
        - routes/
        - middleware/
        - ...
    - package.json
    - ...
- backup/
- scripts/
- Docs/
- public/
- ...
```

## 2. Major Components & Relationships

### Frontend (client/)

- **React Components**: UI building blocks (in `components/`)
- **Pages & Layouts**: Route-based views (in `pages/`)
- **Contexts & State**: Global state (e.g., CartContext, AuthContext)
- **Hooks**: Custom logic for reuse
- **Services**: API calls and business logic
- **Utils**: Helper functions
- **Styles**: CSS/Tailwind for UI
- **Public Assets**: Images, icons, static files

### Backend (server/)

- **Controllers**: Handle API requests (e.g., cart.controller.js)
- **Models**: Database schemas (e.g., cart.model.js)
- **Routes**: API endpoint definitions (e.g., cart.routes.js)
- **Middleware**: Auth, error handling, etc.
- **Config**: Environment and setup

### Infrastructure & Assets

- **Scripts**: Data migration, image handling, etc.
- **Docs**: Screenshots, documentation, diagrams
- **Backup**: Configs and data backups
- **Public**: Shared static assets

## 3. Relationships

- **Frontend <-> Backend**: Communicate via REST API endpoints (e.g., `/api/cart`)
- **Backend <-> Database**: Mongoose models for MongoDB
- **Frontend State**: Contexts and reducers manage UI state, sync with backend
- **Assets**: Used by frontend for UI, by backend for data

---

# Next Steps

- Provide a high-level, plain English system overview
- Outline documentation deliverables for your review

# High-Level System Overview (Plain English)

Imagine your system as a modern restaurant:

- **Frontend (Dining Room):** This is where your users (customers) interact. They browse menus, place orders, and see updates in real time. The frontend is built with React, using components (like tables and menus), pages (different rooms), and contexts (staff keeping track of orders and preferences).

- **Backend (Kitchen):** This is where all the work happens behind the scenes. When a user places an order, the backend (Node.js/Express) receives it, checks the details, updates the database, and sends back the results. Controllers are the chefs, models are the recipes, and routes are the order tickets.

- **Database (Pantry):** All the ingredients (data) are stored here. The backend checks the pantry (MongoDB via Mongoose models) to see what’s available, updates stock, and keeps records of every order.

- **APIs (Waiters):** These are the messengers carrying requests and responses between the dining room and kitchen. REST API endpoints let the frontend and backend communicate clearly and efficiently.

- **Authentication (Host):** The host checks reservations and seats guests. Your auth system ensures only the right users can access certain features (like viewing their cart or making a donation).

- **Assets (Decor & Supplies):** Images, icons, and static files make the dining room inviting and functional.

- **Infrastructure (Management & Maintenance):** Scripts, backups, and documentation keep everything running smoothly and ready for growth.

---

# Documentation Deliverables Outline

## 1. System Overview

- **Plain English summary:** Already provided above.
- **Visual diagrams:**
  - System architecture (boxes/arrows for frontend, backend, database)
  - User journey flow (e.g., "User adds item to cart" step-by-step)
  - Data flow (how information moves from frontend to backend to database)

## 2. Technical Reference

- **File-by-file documentation:**
  - Purpose of each major file/folder
  - Key functions/classes explained
- **API Reference:**
  - List of all REST endpoints (e.g., `/api/cart`, `/api/user`)
  - Example requests and responses
- **Database Schema:**
  - Entity-relationship diagram (ERD)
  - Field-by-field explanation for each model (e.g., Cart, User)

## 3. User Guides

- **Feature walkthroughs:**
  - How to register/login
  - How to browse and search
  - How to add to cart and checkout
  - How to use admin dashboard (if applicable)
- **Screenshots and step-by-step instructions**
- **FAQ and troubleshooting**

## 4. Educational Materials

- **Learning modules:**
  - Beginner: What is this system? Who uses it? What can you do?
  - Intermediate: How does the architecture work? How do features connect?
  - Advanced: How to extend/customize? How to debug and optimize?
- **Interactive code walkthroughs:**
  - Annotated code snippets for key features
  - Before/after comparisons for improvements
- **Glossary:**
  - Simple definitions for all technical terms used

## 5. Presentation Materials

- **Executive summary slides:**
  - What the system does, why it matters, business value
- **Technical deep-dive slides:**
  - Architecture, data flow, technology stack
- **Feature demonstration slides:**
  - Screenshots, user flows, and key benefits

---

# Example: API Reference (Excerpt)

## Cart API

- `GET /api/cart` — Get the current user's cart
- `POST /api/cart` — Add an item to the cart
- `DELETE /api/cart/:itemId` — Remove an item from the cart
- `DELETE /api/cart` — Clear the cart

**Example Request:**

```json
POST /api/cart
{
  "itemId": "Support for Widow with 4 Children-1753711541677-0.6991790404084098",
  "title": "Support for Widow with 4 Children",
  "amount": 500,
  "quantity": 1,
  ...
}
```

**Example Response:**

```json
{
  "user": "6881625c8e5014b191be5b34",
  "items": [
    {
      "itemId": "Support for Widow with 4 Children-1753711541677-0.6991790404084098",
      "title": "Support for Widow with 4 Children",
      "amount": 500,
      "quantity": 2,
      ...
    }
  ]
}
```

---

Let me know if you want to expand any section, generate a specific diagram, or see a full sample for a particular feature or file.
