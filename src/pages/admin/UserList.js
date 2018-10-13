import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Box from '../../components/Box';
import { FlexBox } from '../../components/Flex';
import Grid from '../../components/Grid';

const UserLine = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);

  border-bottom: ${props => props.lastItem ? 'none' : '1px solid #aaa'};
  padding: 0.6rem;

  :hover {
    background-color: #eee;
  }
`;

const getUsers = gql`
  query users {
    users {
      name
      email
      role
      company
      companyType
      companyRegNumber
      confirmed
      emailVerified
    }
  }
`;

const ConfirmButton = styled.button`
  cursor: pointer;
`;

const CONFIRM_USER = gql`
  mutation confirmUser($input: ConfirmUserInput!) {
    confirmUser(input: $input)
  }
`;

const RESEND_VERIFICATION = gql`
  mutation resend($input: SendVerifyEmailLinkInput!) {
    sendVerifyEmailLink(input: $input)
  }
`;

class UserItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmed: this.props.user.confirmed };
  }

  render() {
    return (
      <div>
        <UserLine>
          <div>{this.props.user.name}</div>
          <div>{this.props.user.email}</div>
          <div>{this.props.user.role}</div>
          <div>{this.props.user.company}</div>
          <div>{this.props.user.companyType}</div>
          <div>{this.props.user.companyRegNumber}</div>
          <div>{this.props.user.confirmed ? '✔️' : (
            <Mutation mutation={CONFIRM_USER} onCompleted={() => console.log('sent')}>
              {(confirmUser, { loading, error, data }) => {
                if (data) {
                  if (!this.state.confirmed) this.setState({ confirmed: true });
                  return '✔️';
                } else if (loading) {
                  return 'Confirming...';
                }
                return <ConfirmButton onClick={() => confirmUser({ variables: { input: { email: this.props.user.email } } })}>Confirm</ConfirmButton>;
              }}
            </Mutation>)}
          </div>
          <div>{this.props.user.emailVerified ? '✔️' : (
            <Mutation mutation={RESEND_VERIFICATION} onCompleted={() => console.log('sent')}>
              {(sendVerifyEmailLink, { loading, error, data }) => {
                if (!this.state.confirmed) {
                  return '❌';
                } else if (loading) {
                  return 'Sending...';
                } else if (data) {
                  return 'Sent';
                }
                return <ConfirmButton onClick={() => sendVerifyEmailLink({ variables: { input: { email: this.props.user.email } } })}>Resend</ConfirmButton>;
              }}
            </Mutation>)}
          </div>
        </UserLine>
      </div>
    );
  }
};

const Users = () => (
  <Query query={getUsers}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.toString()}</p>;
      return data.users.map((user, i) => <UserItem key={user.email} user={user} lastItem={(i + 1) === data.users.length} /> );
    }}
  </Query>
);

export default () => (
  <Box width="calc(100% - 4rem)" mx="2rem" textAlign="center">
    <Grid cols="8">
      <div><strong>Name</strong></div>
      <div><strong>Email</strong></div>
      <div><strong>Role</strong></div>
      <div><strong>Company</strong></div>
      <div><strong>Company Type</strong></div>
      <div><strong>Company Reg. Number</strong></div>
      <div><strong>Confirmed</strong></div>
      <div><strong>Verified Email</strong></div>
    </Grid>
    <Users />
  </Box>
);
