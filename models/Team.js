const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Team = mongoose.model('team', TeamSchema);