import password from './password';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkPasswordAPI } from '../../modules/AuthPassword';
//import { getProfileAPI } from '../../modules/GetProfile';
import { forgotPasswordAPI } from '../../modules/ForgotPassword';

const mapStateToProps = state => ({
  isBusy: state.AuthPasswordReducer.isBusy,
  response: state.AuthPasswordReducer,
//  isBusyGetProfile: state.GetProfileReducer.isBusy,
//  responseGetProfile: state.GetProfileReducer,
//  nameGetProfile: state.GetProfileReducer.name,
   isBusyForgot: state.ForgotPasswordReducer.isBusy,
   responseForgot: state.ForgotPasswordReducer

});



export default connect(
  mapStateToProps,
  dispatch => {
    return {
      checkPasswordAPI: bindActionCreators(checkPasswordAPI, dispatch),
      forgotPasswordAPI: bindActionCreators(forgotPasswordAPI, dispatch),
    //  getProfileAPI: bindActionCreators(getProfileAPI, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(password);
//export default password;
