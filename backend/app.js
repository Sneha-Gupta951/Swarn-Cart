const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());

// Base Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Other routes will be mounted here
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// Error Handling Middlewares can be added here

module.exports = app;
