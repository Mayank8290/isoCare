// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  GetVitalsHistory_REQUEST,
  GetVitalsHistory_SUCCESS,
  GetVitalsHistory_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const GetVitalsHistory = async ( userRef: string,) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GetVitalsHistory_REQUEST
  });

  try {
     let details = {
      "patient_ref"   : userRef,
     
};
      const user = await postAPI('get_vital', JSON.stringify(details));

     return dispatch({
       type: GetVitalsHistory_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GetVitalsHistory_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
