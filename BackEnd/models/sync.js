const sequelize = require('../db');
const User = require('./User');
const Task = require('./Task');

const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true }); // Adjust tables to match models
        console.log('All models were synchronized successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error synchronizing models:', error);
        process.exit(1);
    }
};

syncModels();