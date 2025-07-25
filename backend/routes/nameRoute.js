const express = require('express');
const router = express.Router();
const Name = require('../models/Name');

// @route   POST /api/name
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const newName = new Name({ name });
    const saved = await newName.save();
    res.status(201).json({ message: 'Name saved', data: saved });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// (Optional) GET all names
router.get('/', async (req, res) => {
  try {
    const allNames = await Name.find();
    res.status(200).json(allNames);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching names' });
  }
});

module.exports = router;
