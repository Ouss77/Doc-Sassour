const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const visitRoutes = require('./routes/VisitRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const appointment = require('./routes/Apointment.routes');
const medicamentroutes = require('./routes/medicament.routes');

const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const Appointment = require('./models/Apointment.model');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

const uri = process.env.MONGODB_URI;

app.use(cors({
  origin: '*', // specify your frontend domain
}));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api', visitRoutes);
app.use('', medicamentroutes);
app.use('', adminRoutes);
app.use('', appointment);

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server listening on port ${PORT}`);
});
