const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Middleware to parse JSON bodies
router.use(express.json());

// POST /api/tasks
router.post('/tasks', async (req, res) => {
    const { text, intent, entities } = req.body;

    if (!text || !intent || !entities) {
        return res.status(400).json({ error: 'Text, intent, and entities are required.' });
    }

    try {
        const newTask = await Task.create({
            text,
            intent: intent.name,
            entities,
            userId: req.body.userId, // You need to pass userId from the frontend or session
        });

        res.status(201).json({ message: 'Task stored successfully.', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
});

// GET /api/tasks
router.get('/tasks', async (req, res) => {
    const { userId } = req.query; // Pass userId as a query parameter

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    try {
        const tasks = await Task.findAll({ where: { userId } });
        res.json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
});

module.exports = router;