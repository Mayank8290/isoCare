// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  LOGIN_WITH_PASSWORD_REQUEST,
  LOGIN_WITH_PASSWORD_SUCCESS,
  LOGIN_WITH_PASSWORD_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const checkPasswordAPI = async (mobileNumber: string, password: string, fireBaseToken: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: LOGIN_WITH_PASSWORD_REQUEST
  });

  try {
     let details = {
       "phone_number"  : mobileNumber,
        "password"     : password
     };
      const user = await postAPI('login_with_phone', JSON.stringify(details));

     return dispatch({
       type: LOGIN_WITH_PASSWORD_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: LOGIN_WITH_PASSWORD_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
