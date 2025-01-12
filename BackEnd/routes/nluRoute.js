const express = require('express');
const router = express.Router();
const rasaService = require('../services/rasaService');
const Task = require('../models/Task');

// Middleware to parse JSON bodies
router.use(express.json());

// POST /api/nlu
router.post('/nlu', async (req, res) => {
    const { text, userId } = req.body; // Ensure userId is passed from frontend

    if (!text || !userId) {
        return res.status(400).json({ error: 'Text and userId are required.' });
    }

    try {
        // Send text to Rasa and get response
        const rasaResponse = await rasaService.parseText(text);

        // Extract intent and entities
        const intent = rasaResponse.intent ? rasaResponse.intent.name : 'unknown';
        const entities = rasaResponse.entities || [];

        // Store in tasks table
        const newTask = await Task.create({
            text,
            intent,
            entities,
            userId,
        });

        res.status(201).json({
            intent: rasaResponse.intent,
            entities: rasaResponse.entities,
            task: newTask,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
});

module.exports = router;