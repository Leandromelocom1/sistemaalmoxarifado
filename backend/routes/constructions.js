const express = require('express');
const router = express.Router();
const Construction = require('../models/Construction');

// Get all constructions
router.get('/', async (req, res) => {
  try {
    const constructions = await Construction.find();
    res.json(constructions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new construction
router.post('/', async (req, res) => {
  const construction = new Construction({
    client: req.body.client,
    address: req.body.address
  });

  try {
    const newConstruction = await construction.save();
    res.status(201).json(newConstruction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
