import Language from './language';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePasswordAPI } from '../../modules/ChangePassword';
import { getSelectedLanguage } from './../../modules/Language';
const mapStateToProps = state => ({
  isBusy: state.ChangePasswordReducer.isBusy,
  response: state.ChangePasswordReducer,
  languages: state.LanguageReducer.languages
});



export default connect(
  mapStateToProps,
  dispatch => {
    return {
      changePasswordAPI: bindActionCreators(changePasswordAPI, dispatch),
      getSelectedLanguage: bindActionCreators(getSelectedLanguage, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(Language);
//export default ForgotPassword;
