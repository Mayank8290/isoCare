import { NavigationActions } from 'react-navigation';
import ChatClass from './ChatClass';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { getEverythingAPI } from '../../modules/GetEverything';
// import { getChatHistoroyAPI } from '../../modules/ChatHistory';




// const mapStateToProps = state => ({
//   isBusy: state.GetEverythingReducer.isBusy,
//   response: state.GetEverythingReducer,
//    isBusyChatHistory: state.ChatHistoryReducer.isBusy,
//    responseChatHistory: state.ChatHistoryReducer


// });

// export default connect(
//   mapStateToProps,
//   dispatch => {
//     return {
//       getEverythingAPI: bindActionCreators(getEverythingAPI, dispatch),
//       getChatHistoroyAPI: bindActionCreators(getChatHistoroyAPI, dispatch),
//       navigate: bindActionCreators(NavigationActions.navigate, dispatch)
//     };
//   }
// )(Chat);
export default ChatClass;
