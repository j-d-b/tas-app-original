import React from 'react';
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  flex-wrap: ${props => props.wrap};
  justify-content: ${props => props.justify};
  align-items: ${props => props.alignItems};
`;

const FlexItem = styled.div`
  flex-grow: ${props => props.grow};
  flex-shrink: ${props => props.shrink};
  flex-basis: ${props => props.basis};
`;

export { FlexBox, FlexItem };
