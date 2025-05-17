// Make sure dotenv is loaded at the very beginning
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const profileRoutes = require('./routes/profileRoutes');
const sosRoutes = require('./routes/sosRoutes');
const lostFoundRoutes = require('./routes/lostFoundRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Base route
app.get('/', (req, res) => {
  res.send('PANIC Backend API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/lostfound', lostFoundRoutes);
app.use('/api/ai', aiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});