const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  toolName: { type: String, required: true },
  responsible: { type: String, required: true },
  quantity: { type: Number, required: true },
  construction: { type: String, required: true },
  type: { type: String, enum: ['checkout', 'return'], required: true },
  returnQuantity: { type: Number, default: 0 },
  returnDate: { type: Date },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
