import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const getUsers = gql`
  query users {
    users {
      name
      email
      role
      company
    }
  }
`;

const UserBox = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #000;
`;

const UserItem = ({ userInfo }) => (
  <UserBox>
    <div><strong>Name: </strong>{userInfo.name}</div>
    <div><strong>Email: </strong>{userInfo.email}</div>
    <div><strong>Company: </strong>{userInfo.company}</div>
    <div><strong>Role: </strong>{userInfo.role}</div>
  </UserBox>
);

export default () => (
  <Query query={getUsers}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.toString()}</p>;
      return data.users.map(user => <UserItem key={user.email} userInfo={user} />);
    }}
  </Query>
);
