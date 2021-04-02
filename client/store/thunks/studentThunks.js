import axios from 'axios';
import CREATORS from '../actions/creators';



const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const students = (await axios.get('/api/students')).data;
      dispatch(CREATORS.setStudents(students));
      
    } catch (error) {
      console.log('called from deleteCampus ');
      console.log(error);
    }
  };
};

const createStudent = (firstName, lastName, email, history) => {
  return async (dispatch) => {
    try {
      const student = (await axios.post('/api/students/', {firstName, lastName, email })).data;
      dispatch(CREATORS.createStudent(student));
      history.push('/students');
      
    } catch (error) {
      console.log('called from createStudent')
      console.log(error);
    }
  };
};
const updateStudent = (id, data, history) => {
  return async (dispatch) => {
    try {
      const student = (await axios.put(`/api/students/${id}`, data)).data
      dispatch(CREATORS.updateStudent(student));
      history.push(`/students/${student.id}`);
    } catch (error) {
      console.log('called from updateStudent ');
      console.log(error)
    }
  }
}
const registerStudent = (id, campusId) => {
  return async (dispatch) => {
    try {
      const student = (await axios.put(`/api/students/${id}`, { campusId : campusId})).data;
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
      dispatch(CREATORS.registerStudent(student,campus))
    } catch (error) {
      console.log('called from registerStudent ')
      console.log(error);
    }
  }
}

const unregisterStudent = (id, campusId) => {
  return async (dispatch) => {
    try {
      const student = (await axios.put(`/api/students/${id}`)).data;
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
      dispatch(CREATORS.unregisterStudent(student, campus))
    } catch (error) {
      console.log('called from unregisterStudent ')
      console.log(error);
    }
  }
}

const destroyStudent = (student, history) => {
  return async (dispatch) => {
    try {
      dispatch(CREATORS.destroyStudent(student));
      history.push('/students');
      await axios.delete(`/api/students/${student.id}`)
    } catch (error) {
      console.log('called from destroyStudent ')
      console.log(error)
    }
    
  }
};

const student = {
  fetchStudents,
  updateStudent,
  createStudent,
  unregisterStudent,
  registerStudent,
  destroyStudent,
}

export default student;