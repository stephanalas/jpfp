import CREATORS from '../actions/creators';
import axios from 'axios';

const fetchCampus = (campusId) => {
  return async (dispatch) => {
    try {
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data
      dispatch(CREATORS.setCampus(campus));

    } catch (error) {
      console.log('called from fetchCampus ');
      console.log(error);
    }
  };
};

const fetchCampuses = () => {
  return async (dispatch) => {
    try {
      const campuses = (await axios.get('/api/campuses')).data
      dispatch(CREATORS.setCampuses(campuses));

    } catch (error) {
      console.log('called from fetchCampuses ');
      console.log(error);
    }
  };
};

const createCampus = (name, address, history) => {
  return async (dispatch) => {
    try {
      const campus = (await axios.post('/api/campuses', {name, address} )).data;
      dispatch(CREATORS.createCampus(campus));
      history.push('/campuses');
    } catch (error) {
      console.log('called from createCampus ');
      console.log(error);
    }
  };
};
const updateCampus = (id, data, history) => {
  return async (dispatch) => {
    try {

      const campus = (await axios.put(`/api/campuses/${id}`, data)).data;
      dispatch(CREATORS.updateCampus(campus))
      history.push('/campuses'); 
    } catch (error) {
      console.log('called from updateCampus ');
      console.log(error);
    }
  }
}

const destroyCampus = (campus, history) => {
  return async (dispatch) => {
    try {
      dispatch(CREATORS.destroyCampus(campus));
      history.push('/campuses')
      await axios.delete(`/api/campuses/${campus.id}`)
    } catch (error) {
      console.log('called from destroyCampus ')
      console.log(error)
    }
    
  }
};

const campus = {
  createCampus,
  fetchCampus,
  fetchCampuses,
  destroyCampus,
  updateCampus,
}

export default campus;

