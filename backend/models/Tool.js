const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Tool', ToolSchema);
