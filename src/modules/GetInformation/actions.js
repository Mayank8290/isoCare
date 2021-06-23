// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  GetInformation_REQUEST,
  GetInformation_SUCCESS,
  GetInformation_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const GetInformation = async ( userRef: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GetInformation_REQUEST
  });

  try {
     let details = {
       "patient_ref"  : userRef,
     };
      const user = await postAPI('get_information', JSON.stringify(details));

     return dispatch({
       type: GetInformation_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GetInformation_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
