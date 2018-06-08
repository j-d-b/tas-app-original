import React from 'react';

import { FlexBox, FlexItem } from '../components/Flex';
import Box from '../components/Box';
import AppointmentList from '../components/AppointmentList';

class Scheduler extends React.Component {
  render() {
    return (
      <FlexBox>
        <FlexItem basis="60%">
          <Box bgColor="tomato">
            <h2>Scheduler</h2>
          </Box>
        </FlexItem>
        <FlexItem basis="40%">
          <h2>My Appointments</h2>
          <AppointmentList where={{ user: this.props.auth.getUser()} } />
        </FlexItem>
      </FlexBox>
    );
  }
}

export default Scheduler;
