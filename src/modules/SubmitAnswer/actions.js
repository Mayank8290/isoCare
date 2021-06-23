// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  SUBMITANSWER_REQUEST,
  SUBMITANSWER_SUCCESS,
  SUBMITANSWER_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const submitAnswerAPI = async (userRef: string,ques : Array) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: SUBMITANSWER_REQUEST
  });

  try {

     // {
     //         "name"         : "akash",
     //         "email"         : "abce@gmail.com",
     //         "phone_number"  : "7307105220",
     //         "password"      : "123456",
     //         "social_name"   : "",
     //         "social_id"     : ""
     // }

       let details = {
        "patient_ref"   : userRef,
        "answers"        :  ques
};







      const user = await postAPI('submit_answer', JSON.stringify(details));

     return dispatch({
       type: SUBMITANSWER_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: SUBMITANSWER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
