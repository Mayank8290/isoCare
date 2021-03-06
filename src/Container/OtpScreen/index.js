import otpScreen from './otpScreen';

import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginWithPhone } from '../../modules/auth';


const mapStateToProps = state => ({
    isBusy: state.AuthReducer.isBusy,
    response: state.AuthReducer,
 });


export default connect(
 mapStateToProps,
 dispatch => {
   return {
    loginWithPhone: bindActionCreators(loginWithPhone, dispatch),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
   };
 }
)(otpScreen);
// export default otpScreen;
