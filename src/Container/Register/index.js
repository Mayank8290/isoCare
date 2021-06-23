import register from './register';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerAPI } from '../../modules/Register';
//import { getEverythingAPI } from '../../modules/GetEverything';
//import { getProfileAPI } from '../../modules/GetProfile';


const mapStateToProps = state => ({
  isBusy: state.RegisterReducer.isBusy,
  response: state.RegisterReducer,
  languages: state.LanguageReducer.languages,
  // isBusyGetEverything: state.GetEverythingReducer.isBusy,
  // responseGetEverything: state.GetEverythingReducer,
  //isBusyGetProfile: state.GetProfileReducer.isBusy,
  //responseGetProfile: state.GetProfileReducer,



});



export default connect(
  mapStateToProps,
  dispatch => {
    return {
      registerAPI: bindActionCreators(registerAPI, dispatch),
      //getProfileAPI: bindActionCreators(getProfileAPI, dispatch),
      //getEverythingAPI: bindActionCreators(getEverythingAPI, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(register);
//export default register;
