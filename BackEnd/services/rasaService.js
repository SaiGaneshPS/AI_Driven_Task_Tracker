const axios = require('axios');

const rasaService = {
    parseText: async (text) => {
        try {
            const response = await axios.post(`${process.env.RASA_URL}/model/parse`, { text });
            return response.data;
        } catch (error) {
            console.error('Error communicating with Rasa:', error);
            throw error;
        }
    }
};

module.exports = rasaService;