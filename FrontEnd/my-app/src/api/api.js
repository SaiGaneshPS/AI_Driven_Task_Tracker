import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'http://node_backend:3000/api' // Service name defined in docker-compose.yml
    : 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Signup API
export const signup = (userData) => api.post('/signup', userData);

// Login API
export const login = (credentials) => api.post('/login', credentials);

// Create Task via NLU
export const createTaskNLU = (text, token, userId) => api.post('/nlu',
    { text, userId },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);

export const fetchTasks = (token, userId) => api.get(`/tasks?userId=${userId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

// Delete Task
export const deleteTask = (taskId, token) => api.delete(`/tasks/${taskId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});