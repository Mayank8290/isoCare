// @flow
import {
  GETQUESTION_REQUEST,
  GETQUESTION_SUCCESS,
  GETQUESTION_FAILURE
} from './types';
import type State from './types';


const INITIAL_STATE = [{
  error: null,
  response: '',
  isBusy: false

}];



const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETQUESTION_REQUEST:
    return {
        ...state,
        isBusy: true

      };
      //return state.update('isBusy', () => true);
    case GETQUESTION_SUCCESS:
    return {
        ...state,
        isBusy: false,
        response: action.payload

      };


      case GETQUESTION_FAILURE:
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
