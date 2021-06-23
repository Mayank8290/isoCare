import home from './home';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetInformation } from './../../modules/GetInformation'
import { getSelectedLanguage } from './../../modules/Language'
const mapStateToProps = state => ({
  isBusy: state.GetInformationReducer.isBusy,
  response: state.GetInformationReducer
});


export default connect(
  mapStateToProps,
  dispatch => {
    return {
      GetInformation: bindActionCreators(GetInformation, dispatch),
      getSelectedLanguage: bindActionCreators(getSelectedLanguage, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)

    };
  }
)(home);
// export default home;
