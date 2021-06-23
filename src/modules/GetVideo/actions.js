// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETVIDEO_REQUEST,
  GETVIDEO_SUCCESS,
  GETVIDEO_FAILURE
} from './types';
import {  get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import {  postAPI } from '../../utils/api';



export const getVideoAPI = async (Token: string, custId: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETVIDEO_REQUEST
  });


  try {
  //  const user_id = getConfiguration('user_id');

    var path ='get_videos';
     const user = await get(path);

    return dispatch({
      type: GETVIDEO_SUCCESS,
      payload: user
    });
 } catch (e) {
   dispatch({
     type: GETVIDEO_FAILURE,
     payload: e && e.message ? e.message : e
   });

   throw e;
 }
};
