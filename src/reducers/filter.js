const initialState = {
  timeSlotsFilter: 'CURRENT',
  apptTypeFilter: 'ALL',
  blockFilter: 'ALL'
};

const filter = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default filter;
