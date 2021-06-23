// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  EDITPROFILE_REQUEST,
  EDITPROFILE_SUCCESS,
  EDITPROFILE_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';
import { getConfiguration } from '../../utils/configuration';

export const EditProfileAPI = async (id:string,name: string, email: string,phone:string,address: string,city:string, treatment:string,rate:string, usertype:string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: EDITPROFILE_REQUEST
  });

  try {
     var details = {  "user_ref" : "Ll5RyNaVc3kjh4W",
"name" : name,
"email" : email,
"phone_number" :phone,
"gender" : 1,
"dob" : "1898-02-18",
"marital_status" : 1,
"emergency_num" : phone
"guardian_name" : "fgfgfgfgfg",
"profile_photo" : "sdsdsds.jpg"
};

   console.log("finalparam",details)

      const user = await postAPI('/api/v1/user/updateprofile', JSON.stringify(details));

     return dispatch({
       type: EDITPROFILE_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: EDITPROFILE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
