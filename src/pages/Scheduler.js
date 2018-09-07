import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { FlexBox, FlexItem } from '../components/Flex';
import Box from '../components/Box';
import AppointmentList from '../components/AppointmentList';

const ScheduleTitle = styled.span`
  font-weight: 300;
  font-size: 2.25rem;
  color: #fff;
`;

const StartButton = styled.input`
  width: 8rem;
  border-radius: 3px;
  border: none;
  padding: 0;
  margin: 1rem 1rem;
  height: 45px;
  cursor: pointer;
  color: #fff;
  background-color: ${props => props.theme.accent};

  &:hover {
    background-color: ${props => darken(0.05, props.theme.accent)};
  }
`;

class SchedulerRegion extends React.Component {
  render() {
    return (
      <Box height="100%">
        <Box textAlign="center" bg="linear-gradient(limegreen 40%, #39d683, #36bfc1);" radius="8px" height="100%">
          <FlexBox height="100%" direction="column" justify="center" alignItems="center">
            <ScheduleTitle>Schedule an Appointment</ScheduleTitle>
            <StartButton type="submit" value="Start" />
          </FlexBox>
        </Box>
      </Box>
    );
  }
}

const ScheduledApptsRegion = ({ user }) => (
  <Box m="2rem" ml="1rem" mb="0" p="1rem">
    <h2>My Appointments</h2>
    <AppointmentList where={{ user }} />
  </Box>
);

const Scheduler = (props) => (
  <FlexBox height="100%">
    <FlexItem basis="60%">
      <SchedulerRegion />
    </FlexItem>
    <FlexItem basis="40%">
      <ScheduledApptsRegion user={props.auth.getUser()} />
    </FlexItem>
  </FlexBox>
);

export default Scheduler;
