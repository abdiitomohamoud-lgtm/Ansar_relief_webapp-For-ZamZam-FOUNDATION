# Backup Directory

This directory contains files and folders that were moved during the root directory cleanup process. These files might be duplicates, unused, or replaced by newer implementations in the client directory.

## Directory Structure

### config/

- `webpack.config.js` - Basic webpack configuration, replaced by craco.config.js in the client directory
- `tailwind.config.js` - Root-level tailwind config, replaced by the client/tailwind.config.js
- `postcss.config.js` - Root-level postcss config, replaced by the client/postcss.config.js

### scripts/

- `download_images.js` - Script for downloading project images, consolidated with client-specific scripts
- `download-images.js` - Alternative implementation of image downloading script
- `download-missing.js` - Script for downloading missing images

### shortcuts/

- `Desktop - Shortcut.lnk` - Desktop shortcut that's not needed in the codebase

### src/

Files from the root src directory that were replaced by client/src:

- `src/utils/patterns.js` - Pattern utility functions
- `src/assets/patterns/` - SVG pattern files
- `src/index.css` - Base CSS file

## Notes

- The client directory now contains all the actual project code
- Scripts for utilities are moved to the scripts directory or backup/scripts
- Configuration files are centralized in the client directory
- The root directory is now clean with only essential files

## Reason for Backup

These files were backed up rather than deleted to preserve any potentially useful code or configurations that might be needed in the future. If you're certain they're no longer needed, you can safely delete this backup directory.
