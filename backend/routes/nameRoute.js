const express = require('express');
const router = express.Router();
const upload = require('../cloudinary/uploader');
const User = require('../models/User');

// POST - upload name + image
router.post('/image', upload.single('file'), async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file?.path;

    const user = new User({ name, imageUrl });
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
