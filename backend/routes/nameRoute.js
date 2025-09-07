const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const User = require('../models/User');

// POST - upload name + image
router.post('/image', upload.array('file', 5), async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { name } = req.body;
    const imageUrls = req.files['images']?.map(file => file.path) || [];
    const videoUrls = req.files['videos']?.map(file => file.path) || [];

    const user = new User({ name, imageUrls, videoUrls });
    await user.save();

    res.status(201).json({ message: 'Saved', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// GET - all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

module.exports = router;


