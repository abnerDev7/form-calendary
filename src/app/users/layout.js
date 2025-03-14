'use client';

import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export default function Layout({ children }) {
  return <Container>{children}</Container>;
}
