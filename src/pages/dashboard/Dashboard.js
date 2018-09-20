import React from 'react';
import { connect } from 'react-redux'

import { FlexBox, FlexItem } from '../../components/Flex';
import Box from '../../components/Box';
import AppointmentList from './AppointmentList';
import Grid from '../../components/Grid';
import OrganizeBox from './OrganizeBox';

import * as actions from '../../actions';

const Dashboard = (props) => (
  <FlexBox height="100%">
    <FlexItem basis="30%">
      <Box ml="1rem">
        <p>{props.sortField}</p>
        <OrganizeBox
          timeSlotsFilter={props.timeSlotsFilter}
          apptTypeFilter={props.apptTypeFilter}
          blockFilter={props.blockFilter}
          sortField={props.sortField}
          sortDirection={props.sortDirection}
          onTimeSlotsChange={props.onTimeSlotsChange}
          onApptTypeChange={props.onApptTypeChange}
          onBlockChange={props.onBlockChange}
          onSortDirChange={props.onSortDirChange}
          onSortFieldChange={props.onSortFieldChange}
          onResetClick={props.onResetClick}
        />
      </Box>
    </FlexItem>
    <FlexItem basis="70%">
      <Box m="2rem">
        <Grid cols="3" colGap="20px">
          <AppointmentList
            sortField={props.sortField}
            sortDirection={props.sortDirection}
            timeSlotsFilter={props.timeSlotsFilter}
            apptTypeFilter={props.apptTypeFilter}
            blockFilter={props.blockFilter}
          />
        </Grid>
      </Box>
    </FlexItem>
  </FlexBox>
);

const mapStateToProps = state => ({
  timeSlotsFilter: state.timeSlotsFilter,
  apptTypeFilter: state.apptTypeFilter,
  blockFilter: state.blockFilter,
  sortField: state.sortField,
  sortDirection: state.sortDirection
});

const mapDispatchToProps = dispatch => ({
  onSortDirChange: direction => dispatch(actions.setSortDirection(direction)),
  onSortFieldChange: field => dispatch(actions.setSortField(field)),
  onTimeSlotsChange: timeSlots => dispatch(actions.setFilterTimeSlots(timeSlots)),
  onApptTypeChange: apptType => dispatch(actions.setFilterApptType(apptType)),
  onBlockChange: block => dispatch(actions.setFilterBlock(block)),
  onResetClick: () => dispatch(actions.resetSort()) && dispatch(actions.resetFilters())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
