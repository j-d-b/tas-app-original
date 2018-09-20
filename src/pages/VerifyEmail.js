import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { FormPage, FormBox } from '../components/Form';
import Logo from '../components/Logo';

const VERIFY_EMAIL = gql`
  mutation verifyEmail($verifyToken: String!) {
    verifyEmail(verifyToken: $verifyToken)
  }
`;

// automatically invokes mutation on component mount
class InvokeVerifyEmail extends React.Component {
  componentDidMount() {
    this.props.verifyEmail();
  }

  render() {
    return this.props.children;
  }
}

export default function VerifyEmail(props) {
  const verifyToken = props.match.params.token;

  return (
    <Mutation mutation={VERIFY_EMAIL} variables={{ verifyToken }}>
      {(verifyEmail, { error, data }) => {
        return (
          <InvokeVerifyEmail verifyEmail={verifyEmail}>
            <FormPage>
              <Logo />
              <FormBox>
                {error && <p>{error.message}</p>}
                {data && <div><p><i>{jwtDecode(verifyToken).userEmail}</i> has been successfully verified.</p>You may now <Link to="/login">login</Link></div>}
              </FormBox>
            </FormPage>
          </InvokeVerifyEmail>
        )
      }}
    </Mutation>
  );
}
