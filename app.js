const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const classifiedRoutes = require('./routes/classifiedRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/classifieds', classifiedRoutes);

module.exports = app;
