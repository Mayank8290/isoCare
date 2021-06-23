import vitals from './vitals';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {AddVitals} from './../../modules/AddVitals';

const mapStateToProps = state => ({
 isBusy: state.AddVitalsReducer.isBusy,
 response: state.AddVitalsReducer,
 languages: state.LanguageReducer.languages
 });


export default connect(
 mapStateToProps,
 dispatch => {
   return {
    AddVitals: bindActionCreators(AddVitals, dispatch),
     navigate: bindActionCreators(NavigationActions.navigate, dispatch)
   };
 }
)(vitals);
// export default vitals;
