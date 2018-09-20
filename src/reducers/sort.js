const initialState = {
  sortField: 'TIME_SLOT',
  sortDirection: 'DESCENDING'
};

const sort = (state = initialState, action) => {
  switch (action.type) {
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

export default sort;
