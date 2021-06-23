// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  SUPPORT_REQUEST,
  SUPPORT_SUCCESS,
  SUPPORT_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const supportAPI = async (name, msg) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: SUPPORT_REQUEST
  });

  try {
     let details = {
       'name': name,
       'msg': msg


     };

    var  user = await postAPI('/api/v1/user/helpandsupport', JSON.stringify(details));


     return dispatch({
       type: SUPPORT_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: SUPPORT_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
