'use client';

import styled, { createGlobalStyle } from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
    
  ul {
    list-style: none;
  }


`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 3rem;
`;

export default GlobalStyles;
