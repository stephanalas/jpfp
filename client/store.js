import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// action constants
const SET_CAMPUSES = 'SET_CAMPUSES';
const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const CREATE_STUDENT = 'CREATE_STUDENT';

// action creators
const setCampuses = (campuses) => {
  return {
    type: SET_CAMPUSES,
    campuses
  }
}
const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  }
}
const setStudents = (students) => {
  return {
    type: SET_STUDENTS,
    students
  }
}
const _createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student
  }
}

// thunks
export const fetchCampuses = () => {
  return async (dispatch) => {
    const campuses = (await axios.get('/api/campuses')).data
    dispatch(setCampuses(campuses));
  }
}

export const createCampus = (name, address, history) => {
  return async (dispatch) => {
    const campus = (await axios.post('/api/campuses', {name, address} )).data;
    dispatch(_createCampus(campus));
    history.push('/campuses');
  }
}


export const fetchStudents = () => {
  return async (dispatch) => {
    const students = (await axios.get('/api/students')).data;
    dispatch(setStudents(students));
  }
}

export const createStudent = (firstName, lastName, email, history) => {
  return async (dispatch) => {
    const student = (await axios.post('/api/students/', {firstName, lastName, email})).data;
    dispatch(_createStudent(student));
    history.push('/students');
  }
}
 
// reducers
const campusesReducer = (state = [], action) => {
  if (action.type === SET_CAMPUSES) {
    return action.campuses;
  } else if (action.type === CREATE_CAMPUS) {
    state = [...state, action.campus];
  }
  return state;
}

const studentsReducer = (state = [],action) => {
  if (action.type === SET_STUDENTS) {
    return action.students;
  } else if (action.type === CREATE_STUDENT) {
    return [...state, action.student];
  }
  return state
}

const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
})

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware))