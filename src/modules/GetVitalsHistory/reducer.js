// @flow
import { Map } from 'immutable';
import {
  GetVitalsHistory_REQUEST,
  GetVitalsHistory_SUCCESS,
  GetVitalsHistory_FAILURE
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
    case GetVitalsHistory_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case GetVitalsHistory_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case GetVitalsHistory_FAILURE:
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
