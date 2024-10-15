// routes/medicament.routes.js
const express = require('express');
const router = express.Router();
const Medicament = require('../models/medicament.model');

// GET all medicaments
router.get('/medicaments', async (req, res) => {
    try {
        const medicaments = await Medicament.find({});
        res.status(200).json(medicaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
