export const setSortField = sortField => ({
  type: 'SET_SORT_FIELD',
  sortField
});

export const setSortDirection = direction => ({
  type: 'SET_SORT_DIRECTION',
  direction
});

export const resetSort = () => ({
  type: 'RESET_SORT'
});

export const setFilterTimeSlots = timeSlots => ({
  type: 'SET_FILTER_TIME_SLOTS',
  timeSlots
});

export const setFilterApptType = apptType => ({
  type: 'SET_FILTER_APPT_TYPE',
  apptType
});

export const setFilterBlock = block => ({
  type: 'SET_FILTER_BLOCK',
  block
});

export const resetFilters = () => ({
  type: 'RESET_FILTERS'
});
