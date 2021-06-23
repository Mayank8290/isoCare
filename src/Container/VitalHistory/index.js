import vitalHistory from './vitalHistory';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetVitalsHistory } from './../../modules/GetVitalsHistory';


const mapStateToProps = state => ({
 isBusy: state.GetVitalsHistoryReducer.isBusy,
 response: state.GetVitalsHistoryReducer
 });


export default connect(
 mapStateToProps,
 dispatch => {
   return {
    GetVitalsHistory: bindActionCreators(GetVitalsHistory, dispatch),
     navigate: bindActionCreators(NavigationActions.navigate, dispatch)
   };
 }
)(vitalHistory);
// export default vitalHistory;
