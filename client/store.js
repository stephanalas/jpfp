import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// action constants
const SET_CAMPUSES = 'SET_CAMPUSES';
const SET_STUDENTS = 'SET_STUDENTS';
const SET_CAMPUS = 'SET_CAMPUS'
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY_CAMPUS = 'DESTROY_CAMPUS';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const REGISTER_STUDENT = 'REGISTER_STUDENT';
const UNREGISTER_STUDENT = 'UNREGISTER_STUDENT';

// action creators
const setCampuses = (campuses) => {
  return {
    type: SET_CAMPUSES,
    campuses
  };
};
const setCampus = (campus) => {
  return {
    type: SET_CAMPUS,
    campus
  };
};
const createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  };
};
const destroyCampus = (campus) => {
  return {
    type: DESTROY_CAMPUS,
    campus
  };
};
const updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
}
const setStudents = (students) => {
  return {
    type: SET_STUDENTS,
    students
  };
};
const createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student
  };
};
const updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student
  }
}
const destroyStudent = (student) => {
  return {
    type: DESTROY_STUDENT,
    student
  };
};
const registerStudent = (student, campus) => {
  return {
    type: REGISTER_STUDENT,
    student,
    campus
  }
}
const unregisterStudent = (student,campus) => {
  return {
    type: UNREGISTER_STUDENT,
    student,
    campus
  }
}
// thunks


export const fetchCampusThunk = (campusId) => {
  return async (dispatch) => {
    try {
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data
      dispatch(setCampus(campus));

    } catch (error) {
      console.log('called from fetchCampus thunk');
      console.log(error);
    }
  };
};

export const fetchCampusesThunk = () => {
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

export const createCampusThunk = (name, address, history) => {
  return async (dispatch) => {
    try {
      const campus = (await axios.post('/api/campuses', {name, address} )).data;
      dispatch(createCampus(campus));
      history.push('/campuses');
    } catch (error) {
      console.log('called from createCampus thunk');
      console.log(error);
    }
  };
};
export const updateCampusThunk = (id, data, history) => {
  return async (dispatch) => {
    try {

      const campus = (await axios.put(`/api/campuses/${id}`, data)).data;
      dispatch(updateCampus(campus))
      history.push('/campuses'); 
    } catch (error) {
      console.log('called from updateCampus thunk');
      console.log(error);
    }
  }
}

export const destroyCampusThunk = (campus) => {
  return async (dispatch) => {
    try {
      dispatch(destroyCampus(campus));
      await axios.delete(`/api/campuses/${campus.id}`)
    } catch (error) {
      console.log('called from destroyCampus thunk')
      console.log(error)
    }
    
  }
};

export const fetchStudentsThunk = () => {
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

export const createStudentThunk = (firstName, lastName, email, history) => {
  return async (dispatch) => {
    try {
      const student = (await axios.post('/api/students/', {firstName, lastName, email })).data;
      dispatch(createStudent(student));
      history.push('/students');
      
    } catch (error) {
      console.log('called from createStudent')
      console.log(error);
    }
  };
};
export const updateStudentThunk = (id, data, history) => {
  return async (dispatch) => {
    try {
      const student = (await axios.put(`/api/students/${id}`, data)).data
      dispatch(updateStudent(student));
      history.push(`/students/${student.id}`);
    } catch (error) {
      console.log('called from updateStudent thunk');
      console.log(error)
    }
  }
}
export const registerStudentThunk = (id, campusId) => {
  return async (dispatch) => {
    try {
      const student = (await axios.put(`/api/students/${id}`, { campusId : campusId})).data;
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
      dispatch(registerStudent(student,campus))
    } catch (error) {
      console.log('called from registerStudent thunk')
      console.log(error);
    }
  }
}

export const unregisterStudentThunk = (id, campusId) => {
  return async (dispatch) => {
    try {
      const student = (await axios.put(`/api/students/${id}`)).data;
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
      dispatch(unregisterStudent(student, campus))
    } catch (error) {
      console.log('called from unregisterStudent thunk')
      console.log(error);
    }
  }
}

export const destroyStudentThunk = (student, history) => {
  return async (dispatch) => {
    try {
      dispatch(destroyStudent(student));
      history.push('/students');
      await axios.delete(`/api/students/${student.id}`)
    } catch (error) {
      console.log('called from destroyStudent thunk')
      console.log(error)
    }
    
  }
};

// reducers
const campusesReducer = (state = [], action) => {
  const { type } = action;
  if (type === SET_CAMPUSES) {
    return action.campuses;
  } else if (type === CREATE_CAMPUS) {
    state = [...state, action.campus];
  } else if (type === DESTROY_CAMPUS) {
    state = state.filter(campus => campus.id !== action.campus.id);
  } else if (type === UPDATE_CAMPUS || type===UNREGISTER_STUDENT || type === REGISTER_STUDENT) {
    state = state.filter(campus => campus.id !== action.campus.id).concat([action.campus]);
  }
  return state;
};

const studentsReducer = (state = [], action) => {
  const { type } = action;
  if (type === SET_STUDENTS) {
    return action.students;
  } else if (type === CREATE_STUDENT) {
    return [...state, action.student];
  } else if (type === DESTROY_STUDENT) {
    state = state.filter(student => student.id !== action.student.id)
  } else if (type === UNREGISTER_STUDENT || type === UPDATE_STUDENT || type=== REGISTER_STUDENT) {
    state = state.filter(student => student.id !== action.student.id).concat([action.student])
  } 
  return state
};


const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  selectedCampus: (state={}, action) => {
    if (action.type === SET_CAMPUS) {
      state = action.campus;
    }
    return state;
  }
})

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));