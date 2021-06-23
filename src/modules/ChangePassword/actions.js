// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const changePasswordAPI = async (new_password: string, user_ref: string, password: string, confirmPassword: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: CHANGE_PASSWORD_REQUEST
  });

  try {
     let details = {
       'new_password': new_password,
       'user_ref': user_ref,

     };
      const user = await postAPI('change_password/', JSON.stringify(details));

     return dispatch({
       type: CHANGE_PASSWORD_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: CHANGE_PASSWORD_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
