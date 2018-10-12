import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { FlexBox, FlexItem } from '../../components/Flex';
import Box from '../../components/Box';
import Appointments from './Appointments';
import Grid from '../../components/Grid';
import OrganizeBox from './OrganizeBox';

class Dashboard extends React.Component {
  render() {
    return (
      <FlexBox height="100%">
        <FlexItem basis="30%">
          <Box ml="1rem">
            <OrganizeBox />
          </Box>
        </FlexItem>
        <FlexItem basis="70%">
          <Box m="2rem">
            <Grid cols="3" colGap="20px">
              <Appointments />
            </Grid>
          </Box>
        </FlexItem>
      </FlexBox>
    );
  }
}

export default Dashboard;
