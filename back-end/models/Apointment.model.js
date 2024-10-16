const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: { type: String, required: true },  // ISO date string 'YYYY-MM-DD'
  time: { type: String, required: true },  // Time string 'HH:00'
  note: { type: String, required: true },  // Note added by user
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
