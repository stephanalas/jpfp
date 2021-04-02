import CONSTANTS from '../actions/constants';

const studentsReducer = (state = [], action) => {
  const { type } = action;
  if (type === CONSTANTS.SET_STUDENTS) {
    return action.students;
  } else if (type === CONSTANTS.CREATE_STUDENT) {
    return [...state, action.student];
  } else if (type === CONSTANTS.DESTROY_STUDENT) {
    state = state.filter(student => student.id !== action.student.id)
  } else if (type === CONSTANTS.UNREGISTER_STUDENT || type === CONSTANTS.UPDATE_STUDENT || type=== CONSTANTS.REGISTER_STUDENT) {
    state = state.filter(student => student.id !== action.student.id).concat([action.student])
  } 
  return state
};

export default studentsReducer;