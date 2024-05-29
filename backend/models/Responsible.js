const mongoose = require('mongoose');

const ResponsibleSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Responsible', ResponsibleSchema);
