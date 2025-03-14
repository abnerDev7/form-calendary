'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

const Nav = styled.nav`
  width: 10%;
  margin: 20px auto;
  background-color: red;
  padding: 9px 0px;
  background-color: #f8f9fa;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 11px;
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledLink = styled.a`
  padding: 10px 20px;
  text-decoration: none;
  color: #495057;
  border-radius: 5px;

  &.active {
    background-color: #1864ab;
    color: #fff;
    font-weight: 700;
  }
`;

const Navigation = () => {
  const pathname = usePathname();

  return (
    <Nav>
      <Ul>
        <li>
          <StyledLink
            href="/users"
            className={pathname === '/users' ? 'active' : ''}
          >
            Users
          </StyledLink>
        </li>
        <li>
          <StyledLink
            href="/calendary"
            className={pathname === '/calendary' ? 'active' : ''}
          >
            Calendary
          </StyledLink>
        </li>
      </Ul>
    </Nav>
  );
};

export default Navigation;
