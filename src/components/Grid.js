import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-column-gap: ${props => props.colGap};
`;

export default Grid;
