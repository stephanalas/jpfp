import CONSTANTS from "../actions/constants";

const errorsReducer = (state = [], action) => {
  if (action.type === CONSTANTS.SET_ERRORS) {
    state = state.concat(action.errors);
  } else if (action.type === CONSTANTS.CLEAR_ERRORS) {
    state = [];
  }
  return state;
};

export default errorsReducer;
