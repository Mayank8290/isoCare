import employeeHome from './employeeHome';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PatientList } from '../../modules/PatientList';

const mapStateToProps = state => ({
  isBusy: state.PatientListReducer.isBusy,
  response: state.PatientListReducer
});



export default connect(
  mapStateToProps,
  dispatch => {
    return {
        PatientList: bindActionCreators(PatientList, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(employeeHome);
// export default employeeHome;
