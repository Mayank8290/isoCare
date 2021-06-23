// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const registerAPI = async (name: string,email: string,mobileNumber: string,  password: string, address: string,) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: REGISTER_REQUEST
  });

  try {

       let details = {
        "patient_name" : name,
        "email"        : email,
        "password"     :  password,
        "phone"        : mobileNumber,
        "address"      : address
};






    console.log('cgdfhfdgfg',details);

      const user = await postAPI('add_patient', JSON.stringify(details));

     return dispatch({
       type: REGISTER_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
