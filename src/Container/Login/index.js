import Login from './login';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginWithPhone } from '../../modules/auth';
import { loginWithSocial } from '../../modules/AuthSocial';
import { PatientLogin } from '../../modules/PatientLogin';
import { getSelectedLanguage } from './../../modules/Language'
const mapStateToProps = state => ({
  isBusy: state.AuthReducer.isBusy,
  response: state.AuthReducer,

  isBusySocial: state.AuthSocialReducer.isBusy,
  responseSocial: state.AuthSocialReducer,
  languages: state.LanguageReducer.languages,
  isBusyLogin: state.PatientLoginReducer.isBusy,
  responseLogin: state.PatientLoginReducer,


});



export default connect(
  mapStateToProps,
  dispatch => {
    return {
      loginWithPhone: bindActionCreators(loginWithPhone, dispatch),
      loginWithSocial: bindActionCreators(loginWithSocial, dispatch),
      PatientLogin: bindActionCreators(PatientLogin, dispatch),
      getSelectedLanguage: bindActionCreators(getSelectedLanguage, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(Login);
//export default Login;
