// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETSTATE_REQUEST,
  GETSTATE_SUCCESS,
  GETSTATE_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import {  postAPI } from '../../utils/api';



export const getStateAPI = async (Token: string, custId: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETSTATE_REQUEST
  });


  try {
  //  const user_id = getConfiguration('user_id');

    var path ='products?filter[limit]=50';
     const user = await get(path);

    return dispatch({
      type: GETSTATE_SUCCESS,
      payload: user
    });
 } catch (e) {
   dispatch({
     type: GETSTATE_FAILURE,
     payload: e && e.message ? e.message : e
   });

   throw e;
 }
};
