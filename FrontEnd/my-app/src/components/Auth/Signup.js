import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/api';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 400px;
  margin: auto;
  padding: 20px;
`;

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            setMessage(response.data.message);
            // Add a slight delay before navigation to show the success message
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Signup failed.');
        }
    };

    return (
        <FormContainer>
            <h2>Sign Up</h2>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                /><br /><br />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                /><br /><br />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /><br /><br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /><br /><br />
                <button type="submit">Sign Up</button>
            </form>
        </FormContainer>
    );
};

export default Signup;