// @flow
import { Map } from 'immutable';
import {
  SendMessage_REQUEST,
  SendMessage_SUCCESS,
  SendMessage_FAILURE
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
    case SendMessage_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case SendMessage_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case SendMessage_FAILURE:
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
