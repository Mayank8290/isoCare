// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  SendMessage_REQUEST,
  SendMessage_SUCCESS,
  SendMessage_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const SendMessage = async ( userRef: string,message: string,) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: SendMessage_REQUEST
  });

  try {
     let details = {
      "patient_ref"   : userRef,
      "message" : message
     
};
      const user = await postAPI('send_messages', JSON.stringify(details));

     return dispatch({
       type: SendMessage_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: SendMessage_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
