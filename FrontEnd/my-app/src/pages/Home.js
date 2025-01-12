import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Home = () => {
    return (
        <HomeContainer>
            <h1>Welcome to Task Manager</h1>
            <div>
                <Link to="/signup"><button>Sign Up</button></Link>
                <Link to="/login"><button>Login</button></Link>
            </div>
        </HomeContainer>
    );
};

export default Home;