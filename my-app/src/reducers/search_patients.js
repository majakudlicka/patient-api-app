import {
  FETCH_PATIENTS,
  FILTER_PATIENTS,
  SELECT_PATIENTS_BY_ID,
} from '../constants/action_types.js';

const initialState = {
  patients: [],
  filteredPatients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return {
        ...state,
        patients: action.response,
      };
    case SELECT_PATIENTS_BY_ID:
      return {
        ...state,
        patients: action.response,
      };
    case FILTER_PATIENTS:
      let filteredPatients = state.patients.filter(patient => {
        return patient.name.includes(action.response);
      });
      return {
        ...state,
        filteredPatients: filteredPatients,
      };

    default:
      return state;
  }
};
