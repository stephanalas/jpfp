import CONSTANTS from './constants';

const setCampuses = (campuses) => {
  return {
    type: CONSTANTS.SET_CAMPUSES,
    campuses
  };
};
const setCampus = (campus) => {
  return {
    type: CONSTANTS.SET_CAMPUS,
    campus
  };
};
const createCampus = (campus) => {
  return {
    type: CONSTANTS.CREATE_CAMPUS,
    campus
  };
};
const destroyCampus = (campus) => {
  return {
    type: CONSTANTS.DESTROY_CAMPUS,
    campus
  };
};
const updateCampus = (campus) => {
  return {
    type: CONSTANTS.UPDATE_CAMPUS,
    campus,
  }
}
const setStudents = (students) => {
  return {
    type: CONSTANTS.SET_STUDENTS,
    students
  };
};
const createStudent = (student) => {
  return {
    type: CONSTANTS.CREATE_STUDENT,
    student
  };
};
const updateStudent = (student) => {
  return {
    type: CONSTANTS.UPDATE_STUDENT,
    student
  }
}
const destroyStudent = (student) => {
  return {
    type: CONSTANTS.DESTROY_STUDENT,
    student
  };
};
const registerStudent = (student, campus) => {
  return {
    type: CONSTANTS.REGISTER_STUDENT,
    student,
    campus
  }
}
const unregisterStudent = (student,campus) => {
  return {
    type: CONSTANTS.UNREGISTER_STUDENT,
    student,
    campus
  }
}
const setErrors = (errors) => {
  return {
    type: CONSTANTS.SET_ERRORS,
    errors
  }
}
const clearErrors = () => {
  return {
    type: CONSTANTS.CLEAR_ERRORS
  }
}
const CREATORS = {
  setCampus,
  setCampuses,
  setStudents,
  createCampus,
  createStudent,
  destroyCampus,
  destroyStudent,
  updateCampus,
  updateStudent,
  unregisterStudent,
  registerStudent,
  setErrors,
  clearErrors
};

export default CREATORS;