import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/api';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 400px;
  margin: auto;
  padding: 20px;
`;

const Login = ({ setAuth }) => {  // Make sure you're receiving setAuth, not setToken
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials);
            console.log('Login response:', response.data);  // Debug log

            if (!response.data.token || !response.data.userId) {
                console.error('Missing token or userId in response:', response.data);
                setMessage('Login failed: Invalid server response');
                return;
            }

            // Make sure we're setting both token and userId
            setAuth({
                token: response.data.token,
                userId: response.data.userId.toString()
            });

            setMessage('Login success!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            console.error('Login error details:', error);  // More detailed error logging
            setMessage(error.response?.data?.error || 'Login failed.');
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <FormContainer>
            <h2>Login</h2>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                /><br /><br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                /><br /><br />
                <button type="submit">Login</button>
            </form>
        </FormContainer>
    );
};

export default Login;