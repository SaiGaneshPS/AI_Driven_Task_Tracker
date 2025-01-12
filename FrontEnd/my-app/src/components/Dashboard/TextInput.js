// src/components/Dashboard/TextInput.js
import React, { useState } from 'react';
import { createTaskNLU } from '../../api/api';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const TextInput = ({ token, userId, refreshTasks }) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Debug logs
        console.log('Submitting task with:', {
            text,
            token,
            userId
        });

        if (!text.trim()) {
            setMessage('Please enter some text.');
            return;
        }

        try {
            const response = await createTaskNLU(text, token, userId);
            console.log('Task creation response:', response.data); // Debug log

            setMessage('Task created successfully!');
            setText('');
            refreshTasks();
        } catch (error) {
            console.error('Task creation error:', {
                error: error.response?.data,
                status: error.response?.status,
                userId: userId,
                hasToken: !!token
            });
            setMessage(error.response?.data?.error || 'Failed to create task.');
        }
    };

    return (
        <FormContainer>
            <h3>Add New Task</h3>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter your task here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="3"
                    required
                /><br /><br />
                <button type="submit">Submit</button>
            </form>
        </FormContainer>
    );
};

export default TextInput;