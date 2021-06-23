// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  PatientLogin_REQUEST,
  PatientLogin_SUCCESS,
  PatientLogin_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const PatientLogin = async (email: string, password: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: PatientLogin_REQUEST
  });

  try {
     let details = {
       'email': email,
       'password': password,

     };

      const user = await postAPI('patient_login_with_email', JSON.stringify(details));

     return dispatch({
       type: PatientLogin_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: PatientLogin_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
