import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Appointment from './Appointment.js';

const APPTS_QUERY = gql`
  query appts($where: ApptsWhere) {
    appts(where: $where) {
      id
      user {
        name
        company
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
  const where = {};
  if (props.apptTypeFilter !== 'ALL') where.type = props.apptTypeFilter;
  if (props.blockFilter !== 'ALL') where.block = props.blockFilter;

  return (
    <Query query={APPTS_QUERY} variables={where}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          return <p>{error.toString()}</p>;
        }
        if (data.myAppts && data.myAppts.length) { // TODO
          return data.myAppts.map(appt => <Appointment key={appt.id} apptInfo={appt} />);
        }
        if (data.appts && data.appts.length) {
          const sorted = data.appts.slice().sort((a, b) => {
            let val = 0;
            let valA, valB;

            switch (props.sortField) {
              case 'TIME_SLOT':
                const hourA = a.timeSlot.hour >= 10 ? `${a.timeSlot.hour}:00:00` : `0${a.timeSlot.hour}:00:00`;
                const hourB = b.timeSlot.hour >= 10 ? `${b.timeSlot.hour}:00:00` : `0${b.timeSlot.hour}:00:00`;
                valA = new Date(Date.parse(a.timeSlot.date + 'T' + hourA));
                valB = new Date(Date.parse(b.timeSlot.date + 'T' + hourB));
                break;
              case 'BLOCK':
                valA = a.typeDetails.block || '';
                valB = b.typeDetails.block || '';
                break;
              case 'TYPE':
                valA = a.type.toUpperCase();
                valB = b.type.toUpperCase();
                break;
              case 'CUSTOMER':
                valA = a.user.name.toUpperCase();
                valB = b.user.name.toUpperCase();
                break;
              case 'COMPANY':
                valA = a.user.company.toUpperCase();
                valB = b.user.company.toUpperCase();
                break;
            }

            if (valA < valB) val = -1;
            else if (valA > valB) val = 1;

            let flipSort = props.sortDirection === 'ASCENDING' ? -1 : 1;
            if (props.sortField === 'TIME_SLOT') flipSort *= -1;
            return val * flipSort;
          });

          return sorted.filter(appt => {
            switch (props.timeSlotsFilter) {
              case 'ALL': break;
              case 'CURRENT':
              case 'NEXT':
              case 'UPCOMING':
              case 'PAST':
            }
            if (props.apptTypeFilter !== 'ALL') return appt.type === props.apptTypeFilter;
            return true;
          }).map(appt => <Appointment key={appt.id} apptInfo={appt} />);
        }

        return <p>No appointments</p>;
      }}
    </Query>
  );
};
