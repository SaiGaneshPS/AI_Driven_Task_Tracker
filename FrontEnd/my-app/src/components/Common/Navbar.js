import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: ${({ theme }) => theme.buttonBackground};
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const Navbar = ({ token, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');  // Redirect to home after logout
    };

    return (
        <Nav>
            <div>
                <Link to="/">Home</Link>
                {token && <Link to="/dashboard" style={{ marginLeft: '20px' }}>Dashboard</Link>}
            </div>
            <div>
                {token ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to="/signup"><button>Sign Up</button></Link>
                        <Link to="/login"><button style={{ marginLeft: '10px' }}>Login</button></Link>
                    </>
                )}
            </div>
        </Nav>
    );
};

export default Navbar;