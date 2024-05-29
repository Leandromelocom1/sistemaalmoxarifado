const mongoose = require('mongoose');

const ConstructionSchema = new mongoose.Schema({
  client: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Construction', ConstructionSchema);
