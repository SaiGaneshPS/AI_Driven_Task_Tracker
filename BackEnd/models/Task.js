const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    intent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    entities: {
        type: DataTypes.JSON, // Stores entities as JSON
        allowNull: false,
    },
}, {
    tableName: 'tasks',
    timestamps: true, // Enable createdAt and updatedAt
});

Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

module.exports = Task;