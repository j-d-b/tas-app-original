import styled from 'styled-components';

const Box = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};

  padding-top: ${props => props.p || props.py || props.pt};
  padding-right: ${props => props.p || props.px || props.pr};
  padding-bottom: ${props => props.p || props.py || props.pb};
  padding-left: ${props => props.p || props.px || props.pl};

  margin-top: ${props => props.m || props.my || props.mt};
  margin-right: ${props => props.m || props.mx || props.mr};
  margin-bottom: ${props => props.m || props.my || props.mb};
  margin-left: ${props => props.m || props.mx || props.ml};

  background-color: ${props => props.bgColor};
`;

export default Box;
