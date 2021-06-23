// @flow
import { Map } from 'immutable';
import {
  SUBMITANSWER_REQUEST,
  SUBMITANSWER_SUCCESS,
  SUBMITANSWER_FAILURE
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
    case SUBMITANSWER_REQUEST:
    return {
        ...state,
        isBusy: true,
        response: null
      };
      //return state.update('isBusy', () => true);
    case SUBMITANSWER_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload
      };


      case SUBMITANSWER_FAILURE:
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
