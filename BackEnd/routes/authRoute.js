const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to parse JSON bodies
router.use(express.json());

// POST /api/signup
router.post('/signup', async (req, res) => {
    const { username, password, name, email } = req.body;

    // Simple validation
    if (!username || !password || !name || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        // Create new user
        const newUser = await User.create({
            username,
            password,
            name,
            email,
        });

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
});

// POST /api/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Find user by username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Check password (no encryption as per request)
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Generate JWT (optional, for session management)
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1h' }
        );

        // Send both token and userId in response
        res.json({
            message: 'Login successful.',
            token,
            userId: user.id  // Add this line
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
});


module.exports = router;