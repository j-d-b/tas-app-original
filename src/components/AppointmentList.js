import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Appointment from './Appointment.js';

const getAppts = gql`
  query appts($user: String, $time: String, $block: String, $type: String) {
    appts(user: $user, time: $time, block: $block, type: $type) {
      id
      user
      time
      block
      type
    }
  }
`;

const getApptById = gql`
  query appt($id: ID!) {
    appt(id: $id) {
      id
      user
      time
      block
      type
    }
  }
`;

export default function AppointmentList({ where }) {
  const singleAppt = where.id && true;
  const query = singleAppt ? getApptById : getAppts;

  return (
    <Query query={query} variables={where}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log(error);
          return <p>{error.toString()}</p>;
        }

        if (singleAppt && data.appt) return <Appointment apptInfo={data.appt} />;

        if (!data.appts) return <p>No matching appointments 😖</p>;

        return data.appts.map(appt => <Appointment key={appt.id} apptInfo={appt} />);
      }}
    </Query>
  );
};
