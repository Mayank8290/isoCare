// @flow
import { Map } from 'immutable';
import {
  PatientLogin_REQUEST,
  PatientLogin_FAILURE,
  PatientLogin_SUCCESS
} from './types';
import type State from './types';
import { setAuthenticationToken } from './actions';




const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case PatientLogin_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case PatientLogin_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case PatientLogin_FAILURE:
      return {
          ...state,
          isBusy: false,
          response: null
        };
    default:
      return state;
  }
};

export default reducer;
