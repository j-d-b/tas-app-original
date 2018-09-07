import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const meQuery = gql`
  query me {
    me {
      name
      email
      role
      company
    }
  }
`;

const ProfileBox = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  width: 50%;
`;

function ProfileContainer({ userInfo }) {
  return (
    <ProfileBox>
      <h2>Profile</h2>
      <div><strong>{userInfo.name}</strong></div>
      <br />
      <div><strong>Email: </strong>{userInfo.email}</div>
      <div><strong>Company: </strong>{userInfo.company}</div>
      <div><strong>Role: </strong>{userInfo.role}</div>
    </ProfileBox>
  );
}

export default () => (
  <Query query={meQuery}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.toString()}</p>;
      return <ProfileContainer userInfo={data.me} />;
    }}
  </Query>
);
