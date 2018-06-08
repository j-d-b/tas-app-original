import React from 'react';

import { FlexBox, FlexItem } from '../components/Flex';
import Box from '../components/Box';
import AppointmentList from '../components/AppointmentList';

class Scheduler extends React.Component {
  constructor() {
    super();
    this.state = { where: {}, query: {} };
    this.sendQuery = this.sendQuery.bind(this);
  }

  sendQuery() {
    let where = {};
    try {
      where = JSON.parse(this.queryVal.value);
    }
    catch(error) {
      console.log('JSON parsing error: ' + error);
    }
    this.setState({ where: where });
  }

  render() {
    return (
      <Box p="50px">
        <span>Where: </span>
        <input type="text" ref={input => this.queryVal = input} />
        <button onClick={this.sendQuery}>Send Query</button>
        <i> Note this is just for testing and makes a new graphql query every time</i>
        <AppointmentList where={this.state.where} />
      </Box>
    );
  }
}

export default Scheduler;
