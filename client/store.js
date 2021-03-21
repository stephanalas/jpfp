import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
// action constants
const SET_CAMPUSES = 'SET_CAMPUSES';
// const SET_CAMPUS = 'SET_CAMPUS';
const SET_STUDENTS = 'SET_STUDENTS';

// action creators
const setCampuses = (campuses) => {
  return {
    type: SET_CAMPUSES,
    campuses
  }
}
const setStudents = (students) => {
  return {
    type: SET_STUDENTS,
    students
  }
}
// thunk creators
export const fetchCampuses = () => {
  return async (dispatch) => {
    const campuses = (await axios.get('/api/campuses')).data
    dispatch(setCampuses(campuses));
  }
}

export const fetchStudents = () => {
  return async (dispatch) => {
    const students = (await axios.get('/api/students')).data;
    dispatch(setStudents(students));
  }
}
// reducers
const campusesReducer = (state = [], action) => {
  if (action.type === SET_CAMPUSES) {
    return action.campuses;
  }
  return state;
}
const studentsReducer = (state = [],action) => {
  if (action.type === SET_STUDENTS) {
    return action.students;
  }
  return state
}

const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer
})

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware))