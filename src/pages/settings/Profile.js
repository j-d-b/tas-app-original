import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { lighten } from 'polished';

const ME = gql`
  {
    me {
      name
      email
      role
      company
      companyType
      companyRegNumber
      mobileNumber
      reminderSetting
    }
  }
`;

const ProfileBox = styled.div`
  margin: 1rem;
  border-radius: 5px;
  background-color: ${props => lighten(0.2, props.theme.main)}
  padding: 10px;
  text-align: center;
`;

const ReminderSettingSelect = () => (
  <select>
    <option value='EMAIL'>Email Only</option>
    <option value='SMS'>SMS Only</option>
    <option value='BOTH'>Email and SMS</option>
    <option value='NONE'>Off</option>
  </select>
);

function ProfileContainer({ userInfo }) {
  return (
    <ProfileBox>
      <h3>{userInfo.name}</h3>
      <div><strong>Email: </strong>{userInfo.email}</div>
      <div><strong>Company: </strong>{userInfo.company}</div>
      <div><strong>Role: </strong>{userInfo.role}</div>
      <div><strong>Company Type: </strong>{userInfo.companyType}</div>
      <div><strong>Company Reg. Number: </strong>{userInfo.companyRegNumber}</div>
      <div><strong>Mobile Number: </strong>{userInfo.mobileNumber}</div>
      <div><strong>Appointment Reminders: </strong><ReminderSettingSelect />
      </div>
    </ProfileBox>
  );
}

export default () => (
  <Query query={ME}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.toString()}</p>;
      return <ProfileContainer userInfo={data.me} />;
    }}
  </Query>
);
