import { combineReducers } from 'redux';
import campusesReducer from './campusesReducer';
import studentsReducer from './studentsReducer';
import errorsReducer from './errorsReducer';

const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  errors: errorsReducer
})

export default reducer;