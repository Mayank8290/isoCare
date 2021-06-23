// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETPROFILE_REQUEST,
  GETPROFILE_SUCCESS,
  GETPROFILE_FAILURE
} from './types';
import {  get } from '../../utils/api';
import {  postAPI } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';



export const getProfileAPI = async (id: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETPROFILE_REQUEST
  });

  try {
     let details = {
       'patient_ref': id,

     };


      const user = await postAPI('get_user_profile/', JSON.stringify(details));

     return dispatch({
       type: GETPROFILE_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GETPROFILE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
