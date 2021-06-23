// @flow
import { Map } from 'immutable';
import {
  GetInformation_REQUEST,
  GetInformation_SUCCESS,
  GetInformation_FAILURE
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
    case GetInformation_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case GetInformation_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case GetInformation_FAILURE:
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
