import React from 'react';
import styled from 'styled-components';

import logo from '../images/bctc-tas-simple-logo.svg';

const LogoImg = styled.img`
  padding: 6vh 10px 10px 10px;
  height: 2rem;
`;

// const LogoText = styled.div`
//   padding-top: 6vh;
//   font-size: 2rem;
//   font-weight: bold;
//   color: #eee;
// `;

export default () => <LogoImg src={logo} />;
