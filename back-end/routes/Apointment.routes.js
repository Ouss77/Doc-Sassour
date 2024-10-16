const express = require('express');
const router = express.Router();
const Appointment = require('../models/Apointment.model'); // Path to the Appointment model

// POST route to add a new appointment
router.post('/appointments', async (req, res) => {
  try {
    const { date, time, note } = req.body;
    const newAppointment = new Appointment({ date, time, note });
    await newAppointment.save();
    res.status(201).send(newAppointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to fetch appointments for a specific date
router.get('/appointments/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const appointments = await Appointment.find({ date });
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});



// DELETE route to delete an appointment
router.delete('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).send();
    }
    res.send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
