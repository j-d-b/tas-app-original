import React from 'react';
import styled from 'styled-components';

// import Logo from './logo.png'; TODO

const LogoText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #eee;
`;

export default function Logo() {
  return <LogoText>BCTC TAS</LogoText>
}
