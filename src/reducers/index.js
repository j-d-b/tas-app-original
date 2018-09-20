import { combineReducers } from 'redux';

import sort from './sort';
import filter from './filter';

const initialState = {
  timeSlotsFilter: 'CURRENT',
  apptTypeFilter: 'ALL',
  blockFilter: 'ALL',
  sortField: 'TIME_SLOT',
  sortDirection: 'DESCENDING'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER_TIME_SLOTS':
      return {
        ...state,
        timeSlotsFilter: action.timeSlots
      };
    case 'SET_FILTER_APPT_TYPE':
      return {
        ...state,
        apptTypeFilter: action.apptType
      };
    case 'SET_FILTER_BLOCK':
      return {
        ...state,
        blockFilter: action.block
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        ...initialState
      };
    case 'SET_SORT_DIRECTION':
      return {
        ...state,
        sortDirection: action.direction
      };
    case 'SET_SORT_FIELD':
      return {
        ...state,
        sortField: action.sortField
      };
    case 'RESET_SORT':
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
};

export default reducer;
