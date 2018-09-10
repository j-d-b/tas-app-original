import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { FlexBox, FlexItem } from '../../components/Flex';
import Box from '../../components/Box';
import AppointmentList from '../../components/AppointmentList';
import OrganizeBox from './OrganizeBox';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-column-gap: 20px;
`;

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
            <Grid cols="3">
              <AppointmentList />
            </Grid>
          </Box>
        </FlexItem>
      </FlexBox>
    );
  }
}

export default Dashboard;
