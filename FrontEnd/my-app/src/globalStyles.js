import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    font-family: 'Arial', sans-serif;
  }

  a {
    color: ${({ theme }) => theme.color};
    text-decoration: none;
  }

  input, textarea {
    background: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputColor};
    border: 1px solid #333;
    padding: 10px;
    border-radius: 5px;
  }

  button {
    background: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonColor};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }
`;

export default GlobalStyle;