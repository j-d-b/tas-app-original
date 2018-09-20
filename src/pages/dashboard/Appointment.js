import React from 'react';
import styled from 'styled-components';

const ApptBox = styled.div`
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px;
  border: 4px solid #ccc;
`;

const ApptField = styled.div`
  padding: 0.4rem;
`;

export default ({ apptInfo }) => (
  <ApptBox>
    <ApptField><strong>Name: </strong> {apptInfo.user.name}</ApptField>
    <ApptField><strong>Type: </strong> {apptInfo.type}</ApptField>
    <ApptField><strong>Time Slot: </strong>{apptInfo.timeSlot.date} - <i>{apptInfo.timeSlot.hour}:00</i></ApptField>
    <ApptField><strong>Company: </strong>{apptInfo.user.company}</ApptField>
    <ApptField><strong>Block: </strong>TODO</ApptField>
  </ApptBox>
);
