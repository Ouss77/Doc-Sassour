const express = require('express');
const router = express.Router();
const Patient = require('../models/UserModel');

router.post('/', async (req, res) => {
  try {
    const newPatient = new Patient({
      nom: req.body.nom,
      prenom: req.body.prenom,
      dateNaissance: req.body.dateNaissance,
      adresse: req.body.adresse,
      tel: req.body.tel,
      CIN: req.body.CIN
    });
    console.log("hey")
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await Patient.find();
    const formattedUsers = users.map(user => ({
      ...user._doc,
      dateVisite: user.dateVisite ? user.dateVisite.toISOString().split('T')[0] : null, // Format the date of visit if it exists, otherwise set to null
      dateNaissance: user.dateNaissance ? user.dateNaissance.toISOString().split('T')[0] : null // Format the date of birth if it exists, otherwise set to null
    }));
    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Could not fetch users' });
  }
});

//get users CIN from name and surname
router.get('/getPatienCIN', async (req, res) => {
  try {
    const { nom, prenom } = req.query; // Get nom and prenom from query parameters

    if (!nom || !prenom) {
      return res.status(400).json({ message: 'Nom and prenom are required' });
    }

    // Find the patient by nom and prenom
    const patient = await Patient.findOne({ nom: nom, prenom: prenom }, 'CIN');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Return the patient's ID
    res.json({ cin: patient.CIN });
  } catch (error) {
    console.error('Error retrieving patient CIN:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/getPatientId', async (req, res) => {
  try {
    const { nom, prenom } = req.query; // Get nom and prenom from query parameters

    if (!nom || !prenom) {
      return res.status(400).json({ message: 'Nom and prenom are required' });
    }

    // Find the patient by nom and prenom
    const patient = await Patient.findOne({ nom: nom, prenom: prenom }, '_id');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Return the patient's ID
    res.json({ id: patient._id });
  } catch (error) {
    console.error('Error retrieving patient ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//Search patients by id
router.get('/medicalInfo/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId, 'medicalInfos'); 

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient.medicalInfos);  // Send only medical info
  } catch (error) {
    console.error('Error retrieving medical info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Find the user by ID and delete it
    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Could not delete user' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the _id from the request params
    const updates = req.body; // Get the updates from the request body

    // Find the patient by _id and update it with the provided updates
    const updatedPatient = await Patient.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/addMedicalInfo/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const newInfo = {
      id: 0,  // Temporary placeholder, will be replaced by actual next ID
      mutuelle: req.body.mutuelle,
      motif: req.body.motif,
      tension: req.body.tension, 
      diagnostic: req.body.diagnostic, 
      traitement: req.body.traitement,
      dateVisite: req.body.dateVisite
    };

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    newInfo.id = patient.nextMedicalId;  // Set the incrementing ID
    patient.medicalInfos.push(newInfo);  // Add the new info
    patient.nextMedicalId += 1;  // Increment the ID for the next use

    const updatedPatient = await patient.save();
    res.status(201).json(updatedPatient);
  } catch (error) {
    console.error('Error adding medical info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
