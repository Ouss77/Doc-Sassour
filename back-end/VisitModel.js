const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    dateVisited: { type: Date, default: Date.now }
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;