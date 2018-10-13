import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../images/bctc-tas-simple-logo.svg';

const LogoImg = styled.img`
  padding: 6vh 10px 10px 10px;
  height: 2rem;
`;

export default () => <Link to="/"><LogoImg src={logo} /></Link>;
