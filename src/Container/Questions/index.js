import questions from './questions';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getQusetionAPI } from './../../modules/GetQuestion';
import { submitAnswerAPI } from './../../modules/SubmitAnswer'

const mapStateToProps = state => ({
 isBusyquestion: state.GetQuestionReducer.isBusy,
 responsequestion: state.GetQuestionReducer,
 isBusy: state.SubmitAnswerReducer.isBusy,
 response: state.SubmitAnswerReducer,
 languages: state.LanguageReducer.languages
 });


export default connect(
 mapStateToProps,
 dispatch => {
   return {
    submitAnswerAPI: bindActionCreators(submitAnswerAPI, dispatch),
     getQusetionAPI: bindActionCreators(getQusetionAPI, dispatch),
     navigate: bindActionCreators(NavigationActions.navigate, dispatch)
   };
 }
)(questions);
//export default questions;
