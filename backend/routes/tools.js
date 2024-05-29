const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');
const Transaction = require('../models/Transaction');  // Importar o modelo Transaction

// Get all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new tool
router.post('/', async (req, res) => {
  const { name, description, serialNumber, quantity, construction } = req.body;

  try {
    const existingTool = await Tool.findOne({ serialNumber });
    if (existingTool) {
      return res.status(400).json({ message: 'Número de série já existente.' });
    }

    const tool = new Tool({
      name,
      description,
      serialNumber,
      quantity,
      construction
    });

    const newTool = await tool.save();
    res.status(201).json(newTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update tool quantity (for checkout)
router.patch('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: 'Ferramenta não encontrada.' });
    }

    tool.quantity = req.body.quantity;
    const updatedTool = await tool.save();
    res.json(updatedTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Checkout a tool
router.post('/checkout', async (req, res) => {
  const { toolName, responsible, quantity, construction } = req.body;
  try {
    const tool = await Tool.findOne({ name: toolName });
    if (!tool) {
      return res.status(404).json({ message: 'Ferramenta não encontrada.' });
    }
    if (quantity > tool.quantity) {
      return res.status(400).json({ message: 'Quantidade retirada é maior do que a quantidade disponível no estoque.' });
    }

    tool.quantity -= quantity;
    await tool.save();

    const transaction = new Transaction({
      toolName,
      responsible,
      quantity,
      construction,
      type: 'checkout',
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Return a tool
router.post('/return', async (req, res) => {
  const { toolName, responsible, quantity } = req.body;
  try {
    const tool = await Tool.findOne({ name: toolName });
    if (!tool) {
      return res.status(404).json({ message: 'Ferramenta não encontrada.' });
    }

    const transaction = await Transaction.findOne({
      toolName,
      responsible,
      type: 'checkout',
      returnQuantity: { $lt: quantity }
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transação de retirada não encontrada.' });
    }

    if (quantity > transaction.quantity - transaction.returnQuantity) {
      return res.status(400).json({ message: 'Quantidade devolvida é maior do que a quantidade retirada.' });
    }

    transaction.returnQuantity = (transaction.returnQuantity || 0) + quantity;
    transaction.returnDate = new Date();
    await transaction.save();

    tool.quantity += quantity;
    await tool.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
