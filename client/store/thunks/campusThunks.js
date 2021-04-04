import CREATORS from "../actions/creators";
import axios from "axios";

const fetchCampus = (campusId) => {
  return async (dispatch) => {
    try {
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
      dispatch(CREATORS.setCampus(campus));
    } catch (error) {
      console.log("called from fetchCampus ");
      console.log(error);
    }
  };
};

const fetchCampuses = () => {
  return async (dispatch) => {
    try {
      const campuses = (await axios.get("/api/campuses")).data;
      dispatch(CREATORS.setCampuses(campuses));
    } catch (error) {
      console.log("called from fetchCampuses ");
      console.log(error);
    }
  };
};

const createCampus = (name, address, history) => {
  return (dispatch) => {
    axios
      .post("/api/campuses", { name, address })
      .then((res) => {
        dispatch(CREATORS.updateCampus(res.data));
        history.push("/campuses");
      })
      .catch((err) => {
        const { errors } = err.response.data;
        dispatch(CREATORS.setErrors(errors));
        console.log("called from createCampus ");
      });
  };
};
const updateCampus = (id, data, history) => {
  return (dispatch) => {
    axios
      .put(`/api/campuses/${id}`, data)
      .then((res) => {
        dispatch(CREATORS.updateCampus(res.data));
        history.push(`/campuses/${id}`);
        console.log(campus);
      })
      .catch((err) => {
        const { errors } = err.response.data;
        dispatch(CREATORS.setErrors(errors));
        console.log("called from updateCampus");
      });
  };
};

const destroyCampus = (campus, history) => {
  return async (dispatch) => {
    try {
      dispatch(CREATORS.destroyCampus(campus));
      await axios.delete(`/api/campuses/${campus.id}`);
      history.push("/campuses");
    } catch (error) {
      console.log("called from destroyCampus ");
      console.log(error);
    }
  };
};

const campus = {
  createCampus,
  fetchCampus,
  fetchCampuses,
  destroyCampus,
  updateCampus,
};

export default campus;
