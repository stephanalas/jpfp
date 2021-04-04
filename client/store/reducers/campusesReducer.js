import CONSTANTS from '../actions/constants'

const campusesReducer = (state = [], action) => {
  const { type } = action;
  if (type === CONSTANTS.SET_CAMPUSES) {
    return action.campuses;
  } else if (type === CONSTANTS.CREATE_CAMPUS) {
    state = [...state, action.campus];
  } else if (type === CONSTANTS.DESTROY_CAMPUS) {
    state = state.filter(campus => campus.id !== action.campus.id);
  } else if (type === CONSTANTS.UPDATE_CAMPUS || type=== CONSTANTS.UNREGISTER_STUDENT) {
    state = state.filter(campus => campus.id !== action.campus.id).concat([action.campus]);
  } else if ( type === CONSTANTS.REGISTER_STUDENT) {
    state = state.map(campus => {
      if (action.student.campusId === campus.id) {
        return action.campus
      }
      return campus;
    })
  }
  return state;
};

export default campusesReducer;