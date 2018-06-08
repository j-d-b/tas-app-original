import React from 'react';
import styled from 'styled-components';

const ApptBox = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
`;

const ApptField = styled.span`
  padding: 10px;
`;

const Appointment = ({ apptInfo }) => (
  <ApptBox>
    <ApptField><strong>ID:</strong> {apptInfo.id}</ApptField>
    <ApptField><strong>User:</strong> {apptInfo.user}</ApptField>
    <ApptField><strong>Time:</strong> {apptInfo.time}</ApptField>
    <ApptField><strong>Block:</strong> {apptInfo.block}</ApptField>
    <ApptField><strong>Type:</strong> {apptInfo.type}</ApptField>
  </ApptBox>
);

export default Appointment;
