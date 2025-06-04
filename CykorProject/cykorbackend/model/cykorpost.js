const mongoose = require('mongoose');

const cykorpostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'cykoruser' },
}, { timestamps: true });

module.exports = mongoose.model('cykorpost', cykorpostSchema);
