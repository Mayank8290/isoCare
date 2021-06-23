import bookAppointment from './bookAppointment.js';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { loginWithPhone } from './../../modules/LoginPhone';
import {getStateAPI} from './../../modules/GetState'

const mapStateToProps = state => ({
 isBusy: state.GetStateReducer.isBusy,
 response: state.GetStateReducer
 });


export default connect(
 mapStateToProps,
 dispatch => {
   return {
    getStateAPI: bindActionCreators(getStateAPI, dispatch),
     navigate: bindActionCreators(NavigationActions.navigate, dispatch)
   };
 }
)(bookAppointment);
