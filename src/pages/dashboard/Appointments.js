import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Appointment from './Appointment.js';

const getApptsQuery = gql`
  query appts($where: ApptsWhere) {
    appts(where: $where) {
      id
      user {
        name
      }
      timeSlot {
        hour
        date
      }
      type
    }
  }
`;

const myApptsQuery = gql`
  {
    myAppts {
      id
      user {
        name
      }
      timeSlot {
        hour
        date
      }
      type
    }
  }
`;

export default function AppointmentList(props) {
  const query = props.my ? myApptsQuery : getApptsQuery;
  const variables = props.where || {};
  return (
    <Query query={query} variables={variables}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log(error);
          return <p>{error.toString()}</p>;
        }
        if (data.myAppts && data.myAppts.length) return data.myAppts.map(appt => <Appointment key={appt.id} apptInfo={appt} />);
        if (data.appts && data.appts.length) return data.appts.map(appt => <Appointment key={appt.id} apptInfo={appt} />);

        return <p>No appointments</p>;
      }}
    </Query>
  );
};
