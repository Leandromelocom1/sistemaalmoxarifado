const express = require('express');
const router = express.Router();
const Responsible = require('../models/Responsible');

// Get all responsibles
router.get('/', async (req, res) => {
  try {
    const responsibles = await Responsible.find();
    res.json(responsibles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new responsible
router.post('/', async (req, res) => {
  const responsible = new Responsible({
    name: req.body.name
  });

  try {
    const newResponsible = await responsible.save();
    res.status(201).json(newResponsible);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
