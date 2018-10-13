const mongoose = require('mongoose');

// Create playerSchema
const playerSchema = mongoose.Schema({
    name: { type: String }
});

// Create teamSchema
const teamSchema = mongoose.Schema({
    name: { type: String },
    players: [playerSchema]
});

// Create userSchema
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { type: String, required: true },
    teams: [teamSchema]
});

module.exports = mongoose.model('User', userSchema);