// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GETQUESTION_REQUEST,
  GETQUESTION_SUCCESS,
  GETQUESTION_FAILURE
} from './types';
import { get } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';
import { postAPI } from '../../utils/api';



export const getQusetionAPI = async (languagetype: string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETQUESTION_REQUEST
  });


  let details = {
    "language": languagetype,
  };

  try {
    //  const user_id = getConfiguration('user_id');

    var path = 'get_questions';
    const user = await postAPI(path, JSON.stringify(details));

    return dispatch({
      type: GETQUESTION_SUCCESS,
      payload: user
    });
  } catch (e) {
    dispatch({
      type: GETQUESTION_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
