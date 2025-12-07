// Example Project controller
exports.getProjects = (req, res) => {
  res.json({ message: 'Projects endpoint' });
};

exports.getProjectByIdOrSlug = (req, res) => {
  res.json({ message: 'Get project by ID or slug (stub)' });
};
