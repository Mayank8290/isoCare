// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  PatientList_REQUEST,
  PatientList_SUCCESS,
  PatientList_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const PatientList = async ( userRef: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: PatientList_REQUEST
  });

  try {
     let details = {
      "user_ref"   : userRef,
};
      const user = await postAPI('patient_list', JSON.stringify(details));

     return dispatch({
       type: PatientList_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: PatientList_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
