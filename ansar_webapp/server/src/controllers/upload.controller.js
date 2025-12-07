const path = require('path');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads/avatars'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Middleware to use in route
exports.avatarUploadMiddleware = upload.single('avatar');

// Controller for uploading a single file (avatar)
exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Construct the file URL (assuming public/uploads/avatars is served statically)
  const fileUrl = `/uploads/avatars/${req.file.filename}`;
  res.json({ url: fileUrl });
};

exports.uploadMultipleFiles = (req, res) => {
  res.json({ message: 'Upload multiple files (stub)' });
};

exports.deleteFile = (req, res) => {
  res.json({ message: 'Delete file (stub)' });
};
