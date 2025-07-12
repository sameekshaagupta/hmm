const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.post('/list', async (req, res) => {
  try {
    const { title, description, images, category, size, condition, tags, points } = req.body;

    const newItem = new Item({
      title,
      description,
      images: Array.isArray(images) ? images : [],  // If no images, store empty array
      category,
      size,
      condition,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      points: points ? parseInt(points) : 0,
      // Set owner field later if you're using authentication
      owner: '000000000000000000000000' // Placeholder — update if needed
    });

    await newItem.save();
    res.status(201).json({ message: 'Item listed successfully', item: newItem });
  } catch (error) {
    console.error('Item Listing Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
