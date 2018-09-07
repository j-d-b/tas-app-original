import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export default function Navbar({ auth }) {
  return (
    <NavContainer>
      {auth.isAuthorized('OPERATOR') && <NavLink to="/dashboard">Dashboard</NavLink>}
      <NavLink to="/scheduler">Scheduler</NavLink>
      {auth.isAuthorized('OPERATOR') && <NavLink to="/config">Config</NavLink>}
      {auth.isAuthorized('ADMIN') && <NavLink to="/admin">Admin</NavLink>}
      <NavLink to="/settings">Settings</NavLink>
    </NavContainer>
  );
};
