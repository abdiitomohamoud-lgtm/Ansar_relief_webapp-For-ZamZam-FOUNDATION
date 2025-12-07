// News controller

const HomePageData = require('../models/homePageData.model');

// Get all news from HomePageData.news
exports.getNews = async (req, res) => {
  try {
    const homePageData = await HomePageData.findOne();
    if (!homePageData || !Array.isArray(homePageData.news)) {
      return res.json([]);
    }
    // Optionally sort by date descending if date exists
    const news = [...homePageData.news].sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
};

// Get news by ID from HomePageData.news
exports.getNewsById = async (req, res) => {
  try {
    const homePageData = await HomePageData.findOne();
    if (!homePageData || !Array.isArray(homePageData.news)) {
      return res.status(404).json({ error: 'News not found.' });
    }
    const news = homePageData.news.find(n => String(n.id) === String(req.params.id));
    if (!news) {
      return res.status(404).json({ error: 'News not found.' });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news item.' });
  }
};

// Create news (admin)
exports.createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create news.' });
  }
};

// Update news (admin)
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!news) {
      return res.status(404).json({ error: 'News not found.' });
    }
    res.json(news);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update news.' });
  }
};

// Delete news (admin)
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found.' });
    }
    res.json({ message: 'News deleted.' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete news.' });
  }
};
