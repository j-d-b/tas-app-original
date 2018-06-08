import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavCont = styled.div`
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
    props => {
      if (props.to) {
        const primaryPath = '/' + window.location.pathname.split('/')[1];
        if (props.to === primaryPath) {
          return props.theme.light;
        }
      }
    }
  };

  &:hover {
    background-color: ${props => props.theme.light};
  }
`;


export default function Navbar(props) {
  if (!props.auth.isAuthenticated()) return null;

  const path = window.location.pathname;
  if (path === '/login' || path === '/signup') return null;

  return (
    <NavCont>
      {props.auth.isAuthorized('operator') && <NavLink to="/dashboard">Dashboard</NavLink>}
      <NavLink to="/scheduler">Scheduler</NavLink>
      {props.auth.isAuthorized('admin') && <NavLink to="/admin">Admin</NavLink>}
      <NavLink to="/settings">Settings</NavLink>
    </NavCont>
  );
};
