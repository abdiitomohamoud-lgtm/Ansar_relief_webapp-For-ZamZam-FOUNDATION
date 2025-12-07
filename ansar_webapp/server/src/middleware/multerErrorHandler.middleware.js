// Multer error handler middleware for avatar uploads
function multerErrorHandler(err, req, res, next) {
  if (err && err.name === 'MulterError') {
    // Multer-specific errors
    let message = 'File upload error.';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File too large. Max size is 2MB.';
    }
    return res.status(400).json({ message, error: err.message });
  } else if (err && err.message && err.message.includes('Only image files are allowed')) {
    return res.status(400).json({ message: 'Only image files are allowed.', error: err.message });
  }
  // Pass to next error handler if not a Multer error
  next(err);
}

module.exports = multerErrorHandler;
