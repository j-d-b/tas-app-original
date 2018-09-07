import styled from 'styled-components';
import { darken } from 'polished';

import { remToPx } from '../helpers';

// colored background page for login, signup, reset password pages; base container
const FormPage = styled.div`
  height: 100%;
  width: 100%;
  font-size: 0.95rem;
  text-align: center;
  background-color: ${props => props.theme.main};
`;

// floating form box
const FormBox = styled.div`
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  background-color: #fefefe;
  text-align: center;
  padding: 2rem 2rem 1.5rem 2rem;

  @media (min-width: ${401 + remToPx(4)}px) {
    border-radius: 5px;
  }
`;

// within the form box title (e.g. Log In, Sign Up)
const FormTitle = styled.div`
  margin-bottom: 1.3rem;
  font-weight: 300;
  font-size: 1.65rem;
`;

const FormInput = styled.input`
  max-width: 100%;
  border-radius: 3px;
  border: 2px solid #ddd;
  padding: 0.2rem 1rem 0.2rem 1rem;
  height: 45px;
  font-size: 15px;
  width: 100%;
  margin: 0.4rem 0;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #aaa;
  }

  &::placeholder {
    color: #aaa;
  }
`;

// form submit button (<input>)
const FormSubmit = styled.input`
  width: 100%;
  border-radius: 3px;
  border: none;
  margin: 0;
  padding: 0;
  margin: 0.3rem 0;
  height: 45px;
  cursor: pointer;
  color: #fff;
  background-color: ${props => props.theme.accent};

  &:hover {
    background-color: ${props => darken(0.05, props.theme.accent)};
  }
`;

// styled line after the form box content
const FormLineAfter = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #fff;
  font-size: 0.8rem;
`;

export { FormPage, FormBox, FormTitle, FormInput, FormSubmit, FormLineAfter };
