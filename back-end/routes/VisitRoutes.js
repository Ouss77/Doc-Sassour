// Assuming Express.js
const express = require('express');
const router = express.Router();
const Visit = require('../models/VisitModel');

router.get('/visits', async (req, res) => {
    try {
      const visits = await Visit.find();
      res.status(200).json(visits);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Endpoint to add a visit
router.post('/addVisit', async (req, res) => {
    const { nom, prenom, motif, patientId } = req.body;
    try {
        const newVisit = new Visit({
            nom,
            prenom,
            patientId,
            motif,
            dateVisited: new Date()  // Automatically sets to current date/time
        });
        await newVisit.save();
        res.status(201).send(newVisit);
    } catch (error) {
        res.status(500).json({ message: 'Error saving visit', error });
    }
});

router.delete('/removeVisit', async (req, res) => {
    const { nom, prenom } = req.query;  // Get nom and prenom from query parameters
    console.log(`Deleting visit for: ${nom} ${prenom}`);

    try {
        // Find and delete the visit using both nom and prenom
        const visit = await Visit.findOneAndDelete({ nom: nom, prenom: prenom });
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }
        res.json({ message: 'Visit removed successfully' });
    } catch (error) {
        console.error('Failed to remove visit', error);
        res.status(500).json({ message: 'Failed to remove visit' });
    }
});

router.patch('/updateMotif', async (req, res) => {

    const { id, motif } = req.body;
    try {
        const visit = await Visit.findByIdAndUpdate(id, { motif: motif }, { new: true });   
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }
        res.json({ message: 'Motif updated successfully' });
    } catch (error) {
        console.error('Failed to update motif', error);
        res.status(500).json({ message: 'Failed to update motif' });
    }   
});


module.exports = router;
