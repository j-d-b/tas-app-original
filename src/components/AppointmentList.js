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

const compareBy = (sortField) => {
  const field = sortField || 'timeSlot';
  console.log(field);
  return (a, b) => {
    console.log(a[field]);
    console.log(b[field]);

    const nameA = a[field].toUpperCase();
    const nameB = b[field].toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };
};

export default function AppointmentList(props) {
  const query = props.my ? myApptsQuery : getApptsQuery;
  return (
    <Query query={query} variables={props.where}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log(error);
          return <p>{error.toString()}</p>;
        }
        if (data.myAppts && data.myAppts.length) {
          const sorted = data.myAppts.sort(compareBy(props.sortField));
          return sorted.map(appt => <Appointment key={appt.id} apptInfo={appt} />);
        }
        if (data.appts && data.appts.length) {
          const sorted = data.appts.slice().sort(compareBy(props.sortField));
          return sorted.map(appt => <Appointment key={appt.id} apptInfo={appt} />);
        }

        return <p>No appointments</p>;
      }}
    </Query>
  );
};
