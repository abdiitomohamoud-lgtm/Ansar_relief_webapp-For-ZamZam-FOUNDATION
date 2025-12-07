const express = require('express');
const {
  getSadaqahItems,
  getSadaqahById,
  createSadaqah,
  updateSadaqah,
  deleteSadaqah,
  giveSadaqah,
  getSadaqahByType,
  getSadaqahPage
} = require('../controllers/sadaqah.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @route   GET /api/sadaqah
 * @desc    Get all sadaqah items
 * @access  Public
 */
router.get('/', getSadaqahItems);

/**
 * @route   GET /api/sadaqah/page
 * @desc    Get full Sadaqah page data
 * @access  Public
 */
router.get('/page', getSadaqahPage);

/**
 * @route   GET /api/sadaqah/type/:type
 * @desc    Get sadaqah items by type
 * @access  Public
 */
router.get('/type/:type', getSadaqahByType);

/**
 * @route   GET /api/sadaqah/:idOrSlug
 * @desc    Get sadaqah item by ID or slug
 * @access  Public
 */
router.get('/:idOrSlug', getSadaqahById);

/**
 * @route   POST /api/sadaqah
 * @desc    Create a new sadaqah item
 * @access  Private/Admin
 */
router.post('/', protect, admin, createSadaqah);

/**
 * @route   POST /api/sadaqah/give
 * @desc    Give sadaqah
 * @access  Public
 */
router.post('/give', giveSadaqah);

/**
 * @route   PUT /api/sadaqah/:id
 * @desc    Update a sadaqah item
 * @access  Private/Admin
 */
router.put('/:id', protect, admin, updateSadaqah);

/**
 * @route   DELETE /api/sadaqah/:id
 * @desc    Delete a sadaqah item
 * @access  Private/Admin
 */
router.delete('/:id', protect, admin, deleteSadaqah);

module.exports = router;