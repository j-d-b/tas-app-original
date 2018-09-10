import styled from 'styled-components';

export default styled.div`
  max-height: ${props => props.maxHeight};
  max-width: ${props => props.maxWidth};
  width: ${props => props.width};
  height: ${props => props.height};

  padding-top: ${props => props.pt || props.py || props.p};
  padding-right: ${props => props.pr || props.px || props.p};
  padding-bottom: ${props => props.pb || props.py || props.p};
  padding-left: ${props => props.pl || props.px || props.p};

  margin-top: ${props => props.mt || props.my || props.m};
  margin-right: ${props => props.mr || props.mx || props.m};
  margin-bottom: ${props => props.mb || props.my || props.m};
  margin-left: ${props => props.ml || props.mx || props.m};

  background: ${props => props.bg};
  background-color: ${(props) => {
    if (props.bgColor) {
      const theme = props.bgColor.split('.');
      if (theme[0] === 'theme') {
        return props.theme[theme[1]];
      }

      return props.bgColor;
    }
  }};


  text-align: ${props => props.textAlign};

  border-radius: ${props => props.radius};

  overflow: ${props => props.overflow};
`;
