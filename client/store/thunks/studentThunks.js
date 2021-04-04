import axios from "axios";
import CREATORS from "../actions/creators";

const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const students = (await axios.get("/api/students")).data;
      dispatch(CREATORS.setStudents(students));
    } catch (error) {
      console.log("called from deleteCampus ");
      console.log(error);
    }
  };
};

const createStudent = (firstName, lastName, email, history) => {
  return async (dispatch) => {
    axios
      .post("/api/students/", { firstName, lastName, email })
      .then((res) => {
        dispatch(CREATORS.createStudent(res.data));
        history.push("/students");
      })
      .catch((err) => {
        const { errors } = err.response.data;
        dispatch(CREATORS.setErrors(errors));
        console.log("called from createStudent");
      });
  };
};
const updateStudent = (id, data, history) => {
  return async (dispatch) => {
    axios
      .put(`/api/students/${id}`, data)
      .then((res) => {
        dispatch(CREATORS.updateStudent(res.data));
        history.push(`/students/${id}`);
      })
      .catch((err) => {
        const { errors } = err.response.data;
        dispatch(CREATORS.setErrors(errors));
        console.log("called from updateStudent");
      });
  };
};

const registerStudent = (id, campusId) => {
  return async (dispatch) => {
    try {
      const student = (
        await axios.put(`/api/students/${id}`, { campusId: campusId })
      ).data;
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
      dispatch(CREATORS.registerStudent(student, campus));
    } catch (error) {
      console.log("called from registerStudent ");
      console.log(error);
    }
  };
};

const unregisterStudent = (id, campusId) => {
  return async (dispatch) => {
    try {
      const student = (await axios.put(`/api/students/${id}`)).data;
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
      dispatch(CREATORS.unregisterStudent(student, campus));
    } catch (error) {
      console.log("called from unregisterStudent ");
      console.log(error);
    }
  };
};

const destroyStudent = (student, history) => {
  return async (dispatch) => {
    try {
      dispatch(CREATORS.destroyStudent(student));
      history.push("/students");
      await axios.delete(`/api/students/${student.id}`);
    } catch (error) {
      console.log("called from destroyStudent ");
      console.log(error);
    }
  };
};

const student = {
  fetchStudents,
  updateStudent,
  createStudent,
  unregisterStudent,
  registerStudent,
  destroyStudent,
};

export default student;
