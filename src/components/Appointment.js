import React from 'react';
import styled from 'styled-components';

const ApptBox = styled.div`
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  background-color: thistle;
`;

const ApptField = styled.span`
  padding: 10px;
`;

export default ({ apptInfo }) => (
  <ApptBox>
    <ApptField><strong>Name:</strong> {apptInfo.user.name}</ApptField>
    <ApptField><strong>Time:</strong> {apptInfo.time}</ApptField>
    <ApptField><strong>Block:</strong> {apptInfo.block}</ApptField>
    <ApptField><strong>Type:</strong> {apptInfo.type}</ApptField>
  </ApptBox>
);
