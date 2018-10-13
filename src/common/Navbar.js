import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from 'polished';

import logo from '../images/bctc-tas-simple-logo.svg';

const NavLogo = styled.img`
  padding: 10px;
  width: 90px;
`;

const NavContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.main};
  height: 50px;
`;

const NavLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;

  text-decoration: none;
  color: #fff;
  background-color: ${
    (props) => {
      const primaryPath = window.location.pathname;
      if (props.to === primaryPath) {
        return props.theme.dark;
      }
    }
  };

  &:hover {
    background-color: ${props => props.theme.dark};
  }
`;

const NavButton = styled.button`
  margin-left: auto;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  align-self: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  color: #efefef;
  border: 1px solid ${props => props.theme.main};
  background-color: ${props => props.theme.dark};

  &:hover {
    color: #fff;
    border-color: #fff;
  }
`;

export default function Navbar({ auth }) {
  return (
    <NavContainer>
      <Link to="/"><NavLogo src={logo} /></Link>
      {auth.isAuthorized('OPERATOR') && <NavLink to="/dashboard">Dashboard</NavLink>}
      <NavLink to="/scheduler">Scheduler</NavLink>
      {auth.isAuthorized('OPERATOR') && <NavLink to="/config">Config</NavLink>}
      {auth.isAuthorized('ADMIN') && <NavLink to="/admin">Admin</NavLink>}
      <NavLink to="/settings">Settings</NavLink>
      <NavButton onClick={() => auth.logout()}>Logout</NavButton>
    </NavContainer>
  );
};
