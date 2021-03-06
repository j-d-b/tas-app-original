import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  flex-wrap: ${props => props.wrap};
  justify-content: ${props => props.justify};
  align-items: ${props => props.alignItems};

  width: ${props => props.width};
  height: ${props => props.height};
`;

const FlexItem = styled.div`
  flex-grow: ${props => props.grow};
  flex-shrink: ${props => props.shrink};
  flex-basis: ${props => props.basis};
`;

export { FlexBox, FlexItem };
