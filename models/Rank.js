const mongoose = require("mongoose");

const Rank = new mongoose.Schema({
  rankName: {
    type: String,
    required: true
  },
  pointsRequired: {
    type: Number,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Rank', Rank);