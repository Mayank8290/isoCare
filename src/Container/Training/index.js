import training from './training';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVideoAPI } from './../../modules/GetVideo';


const mapStateToProps = state => ({
 isBusyVideo: state.GetVideoReducer.isBusy,
 responseVideo: state.GetVideoReducer,
 languages: state.LanguageReducer.languages
 });


export default connect(
 mapStateToProps,
 dispatch => {
   return {
     getVideoAPI: bindActionCreators(getVideoAPI, dispatch),
     navigate: bindActionCreators(NavigationActions.navigate, dispatch)
   };
 }
)(training);
//export default training;
