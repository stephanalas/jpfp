import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// action constants
const SET_CAMPUSES = 'SET_CAMPUSES';
const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY_CAMPUS = 'DESTROY_CAMPUS';
const DESTROY_STUDENT = 'DESTROY_STUDENT';

// action creators
const setCampuses = (campuses) => {
  return {
    type: SET_CAMPUSES,
    campuses
  };
};
const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  };
};
const _destroyCampus = (campus) => {
  return {
    type: DESTROY_CAMPUS,
    campus
  };
};
const setStudents = (students) => {
  return {
    type: SET_STUDENTS,
    students
  };
};
const _createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student
  };
};
const _destroyStudent = (student) => {
  return {
    type: DESTROY_STUDENT,
    student
  };
};

// thunks
export const fetchCampuses = () => {
  return async (dispatch) => {
    try {
      const campuses = (await axios.get('/api/campuses')).data
      dispatch(setCampuses(campuses));

    } catch (error) {
      console.log('called from fetchCampuses thunk');
      console.log(error);
    }
  };
};

export const createCampus = (name, address, history) => {
  return async (dispatch) => {
    try {
      const campus = (await axios.post('/api/campuses', {name, address} )).data;
      dispatch(_createCampus(campus));
      history.push('/campuses');
    } catch (error) {
      console.log('called from createCampus thunk');
      console.log(error);
    }
  };
};

export const destroyCampus = (campus) => {
  return async (dispatch) => {
    try {
      dispatch(_destroyCampus(campus));
      await axios.delete(`/api/campuses/${campus.id}`)
    } catch (error) {
      console.log('called from destroyCampus thunk')
      console.log(error)
    }
    
  }
};

export const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const students = (await axios.get('/api/students')).data;
      dispatch(setStudents(students));
      
    } catch (error) {
      console.log('called from deleteCampus thunk');
      console.log(error);
    }
  };
};

export const createStudent = (firstName, lastName, email, history) => {
  return async (dispatch) => {
    try {
      const student = (await axios.post('/api/students/', {firstName, lastName, email})).data;
      dispatch(_createStudent(student));
      history.push('/students');
      
    } catch (error) {
      console.log('called from createStudent')
      console.log(error);
    }
  };
};

export const destroyStudent = (student) => {
  return async (dispatch) => {
    try {
      dispatch(_destroyStudent(student));
      await axios.delete(`/api/students/${student.id}`)
    } catch (error) {
      console.log('called from destroyStudent thunk')
      console.log(error)
    }
    
  }
};

// reducers
const campusesReducer = (state = [], action) => {
  if (action.type === SET_CAMPUSES) {
    return action.campuses;
  } else if (action.type === CREATE_CAMPUS) {
    state = [...state, action.campus];
  } else if (action.type === DESTROY_CAMPUS) {
    state = state.filter(campus => campus.id !== action.campus.id)
  }
  return state;
};

const studentsReducer = (state = [],action) => {
  if (action.type === SET_STUDENTS) {
    return action.students;
  } else if (action.type === CREATE_STUDENT) {
    return [...state, action.student];
  } else if (action.type === DESTROY_STUDENT) {
    state = state.filter(student => student.id !== action.student.id)
  }
  return state
};

const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
})

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));