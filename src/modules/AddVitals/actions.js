// @flow
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'react-native-axios';
import {
  AddVitals_REQUEST,
  AddVitals_SUCCESS,
  AddVitals_FAILURE
} from './types';
import {  postAPI } from '../../utils/api';


export const AddVitals = async ( userRef: string,sbp: string,dbp: string,pulse: string,temp: string,spo: string,rr: string,vDate: string,vTime: string,other: string,urine:string,creatinine:string,UserId:string) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: AddVitals_REQUEST
  });

  try {
     let details = {
      "patient_ref"   : userRef,
      "systolic_bp"   : sbp,
      "diastolic_bp"  : dbp,
      "pulse"         : pulse,
      "temp"          : temp,
      "spo2"          : spo,
      "rr"            : rr,
      "vital_date"    : vDate,
      "vital_time"    : vTime,
      "other"         : other,
      "urine"         : urine,
        "creatinine"    : creatinine,
        "added_by"      : UserId,

};
      const user = await postAPI('upload_vitals', JSON.stringify(details));

     return dispatch({
       type: AddVitals_SUCCESS,
       payload: user
     });
  } catch (e) {
    dispatch({
      type: AddVitals_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
