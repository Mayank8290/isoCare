// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  GetMessages_REQUEST,
  GetMessages_SUCCESS,
  GetMessages_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const GetMessages = async ( userRef: string,) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GetMessages_REQUEST
  });

  try {
     let details = {
      "patient_ref"   : userRef,
     
};
      const user = await postAPI('get_messages', JSON.stringify(details));

     return dispatch({
       type: GetMessages_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: GetMessages_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
