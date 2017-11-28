import axios from 'axios';
import {
  FETCH_PATIENTS,
  FILTER_PATIENTS,
  SELECT_PATIENTS_BY_ID,
} from '../constants/action_types.js';

//Fetches all Patients - async
export const fetchPatients = () => dispatch => {
  dispatch({
    type: FETCH_PATIENTS,
    status: 'pending',
  });

  axios
    .get('/patient')
    .then(response =>
      dispatch({
        type: FETCH_PATIENTS,
        status: 'success',
        response: response.data.content,
      })
    )
    .catch(err => {
      dispatch({
        type: FETCH_PATIENTS,
        status: 'error',
        error: err,
      });
    });
};

//Filters PATIENTS - filtering is done on front end
export const filterPatients = title => {
  return {
    type: FILTER_PATIENTS,
    response: title,
  };
};

//Fetches PATIENTS by id - filtering is done on back end
export const fetchById = id => dispatch => {
  dispatch({
    type: SELECT_PATIENTS_BY_ID,
    status: 'pending',
  });

  axios
    .get(`/patient/${id}`)
    .then(response =>
      dispatch({
        type: SELECT_PATIENTS_BY_ID,
        status: 'success',
        response: response.data,
      })
    )
    .catch(err => {
      dispatch({
        type: SELECT_PATIENTS_BY_ID,
        status: 'error',
        error: err,
      });
    });
};
