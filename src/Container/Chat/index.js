import chat from './chat';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {GetInformation} from './../../modules/GetInformation'

import { GetMessages } from './../../modules/GetMessages'
import { SendMessage } from './../../modules/SendMessage'
//
const mapStateToProps = state => ({
  isBusy: state.GetMessagesReducer.isBusy,
  response: state.GetMessagesReducer,
  isBusySendMessage: state.SendMessageReducer.isBusy,
  responseSendMessage: state.SendMessageReducer,
  languages: state.LanguageReducer.languages
});


export default connect(
  mapStateToProps,
  dispatch => {
    return {
      SendMessage: bindActionCreators(SendMessage, dispatch),
      GetMessages: bindActionCreators(GetMessages, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(chat);

// export default chat