// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  LOGIN_WITH_PHONE_REQUEST,
  LOGIN_WITH_PHONE_SUCCESS,
  LOGIN_WITH_PHONE_FAILURE,
  LANGUAGEDATA
} from './types';
import { postAPI } from '../../utils/api';
import Config from '../../utils/Config'

export const getSelectedLanguage = async (languagetype: string) => async (
  dispatch: ReduxDispatch
) => {

  console.log("reached to selection ...................", languagetype);
  let user = {};
  if (languagetype == "punjabi") {
    user = Config.punjabi;
  }
  else if (languagetype == "english") {
    user = Config.english;
  }
  else if (languagetype == "hindi") {
    user = Config.hindi;
  }

  //console.log("set language", user);

  return dispatch({
    type: LANGUAGEDATA,
    payload: user
  });

};

