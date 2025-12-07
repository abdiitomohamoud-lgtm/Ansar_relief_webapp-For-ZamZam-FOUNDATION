# Codebase Cleanup Documentation

This directory contains files that were moved during a codebase cleanup process. These files may have been duplicates, unused, or superseded by newer implementations.

## Directories

### about/

- `About.js` - Duplicate of the main About page
- `AboutPage.js` - Redundant About page in root pages directory
- `AboutPageWithAPI.js` - Alternative implementation with API
- `AboutPageWithBackend.js` - Alternative implementation with backend

### campaigns/

- `CampaignDetail copy.js` - Duplicate of CampaignDetail.js

### components/

- `TestComponent.js` - Unused test component
- `DiagnosticTest.js` - Unused diagnostic component
- `CounterComponent.js` - Unused counter component
- `SimpleLayout.js` - Superseded by Layout.js in layouts directory
- `ProtectedRoute.js` - Superseded by the auth/ProtectedRoute.js version

### context/

- `SecurityContext.js` - Unused security context, replaced by Redux auth state

### pages/

- `ContactUs.js` - Redundant to Contact.js
- `Sadaqah.js` - Empty/stub file
- `Donations.js` - Superseded by UserDonations.js
- `OrderConfirmation.js` - Superseded by DonationConfirmation.js

### routes/

- `index.js` - Old routes definition, replaced by new modular routes system

### services/

- `aboutService.js` - Duplicate of about.service.js with different naming convention

### sponsorships/

- All files from `pages/sponsorships/` directory - Consolidated with `pages/sponsorship/` directory

## Notes

- All routes are now defined in `client/src/routes/` in a modular way:
  - `index.js` - Main routes file
  - `sponsorshipRoutes.js` - Sponsorship routes
  - `projectRoutes.js` - Project routes
- The correct About page is `pages/about/AboutPage.js`
- The correct Contact page is `pages/Contact.js`
- The sponsorship components are organized in `pages/sponsorship/` with category pages in `pages/sponsorship/categories/`
- Project components are organized in `pages/projects/` with category pages in `pages/projects/categories/`

## Changes Made

1. Removed duplicate About page implementations
2. Removed duplicate Campaign detail page
3. Removed unused test components
4. Consolidated sponsorship directories (removed `pages/sponsorships/` in favor of `pages/sponsorship/`)
5. Removed redundant routes configuration file
6. Reorganized routes into a modular system with separate files for major features
7. Removed unused SecurityContext and consolidated ProtectedRoute components

## Future Tasks

1. Standardize service naming conventions (e.g., `.service.js` vs `Service.js`)
2. Implement comprehensive testing for components
3. Further optimize bundle size by removing unused dependencies
4. Consolidate duplicate functionality between similar components
