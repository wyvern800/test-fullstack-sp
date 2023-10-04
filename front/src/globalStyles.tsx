import { createGlobalStyle } from "styled-components";

// Create a GlobalStyle component
const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #D6DAE3;//#0B0E0F;
    color: white;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box; 
    overflow: auto;
    font-family: 'Roboto', sans-serif;

    // remove user selection
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;    
    
    @media (max-width: 1024px) {
      padding: 1%;
    }
  }
`;

export default GlobalStyle;
