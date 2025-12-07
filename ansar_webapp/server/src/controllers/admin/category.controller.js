const logger = require('../../../logger');

// Admin Category Controller (Best Practices)


const ProjectCategoryPage = require('../../../models/ProjectCategoryPage');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await ProjectCategoryPage.find();
    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories', details: err.message });
  }
};


// Create category
exports.createCategory = async (req, res) => {
  try {
    const { category, title, description, heroImage, impactStats, cta, projectIds, reusableContent } = req.body;
    if (!category || !title) return res.status(400).json({ error: 'Category and title are required' });
    const exists = await ProjectCategoryPage.findOne({ category });
    if (exists) return res.status(400).json({ error: 'Category already exists' });
    const newCategory = new ProjectCategoryPage({ category, title, description, heroImage, impactStats, cta, projectIds, reusableContent });
    await newCategory.save();
    res.status(201).json({ data: newCategory });
    // logger.info(`Admin ${req.user.email} created category ${newCategory._id}`);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category', details: err.message });
  }
};


// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { title, description, heroImage, impactStats, cta, projectIds, reusableContent } = req.body;
    const category = await ProjectCategoryPage.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, heroImage, impactStats, cta, projectIds, reusableContent } },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ data: category });
    // logger.info(`Admin ${req.user.email} updated category ${category._id}`);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update category', details: err.message });
  }
};


// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await ProjectCategoryPage.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
    // logger.info(`Admin ${req.user.email} deleted category ${req.params.id}`);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category', details: err.message });
  }
};
