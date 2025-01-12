require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const nluRoute = require('./routes/nluRoute');
const authRoute = require('./routes/authRoute');    // Authentication routes
const tasksRoute = require('./routes/tasksRoute');  // Task routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoute); // Authentication routes
app.use('/api', nluRoute);  // Existing NLU routes
app.use('/api', tasksRoute); // Task routes

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});