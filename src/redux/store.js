
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import AuthReducer from '../modules/auth';
import RegisterReducer from '../modules/Register';
import AuthSocialReducer from '../modules/AuthSocial';
import AuthPasswordReducer from '../modules/AuthPassword';
import ForgotPasswordReducer from '../modules/ForgotPassword';
import GetProfileReducer from '../modules/GetProfile';
import GetQuestionReducer from '../modules/GetQuestion';
import ChangePasswordReducer from '../modules/ChangePassword';
import GetVideoReducer from '../modules/GetVideo';
import SubmitAnswerReducer from '../modules/SubmitAnswer';
import GetInformationReducer from '../modules/GetInformation'
import AddVitalsReducer from '../modules/AddVitals';
import GetMessagesReducer from '../modules/GetMessages';
import SendMessageReducer from '../modules/SendMessage';
import GetStateReducer from '../modules/GetState';
import GetVitalsHistoryReducer from '../modules/GetVitalsHistory';
import PatientListReducer from '../modules/PatientList';
import PatientLoginReducer from '../modules/PatientLogin'
import LanguageReducer from '../modules/Language'
//import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import * as reduxLoop from 'redux-loop-symbol-ponyfill';
import middleware from './middleware';
import reducer from './reducer';


const enhancers = [
  applyMiddleware(...middleware),
  reduxLoop.install()
];



const rootReducer = combineReducers({
  AuthReducer,
  RegisterReducer,
  ChangePasswordReducer,
  ForgotPasswordReducer,
  AuthSocialReducer,
  AuthPasswordReducer,
  GetQuestionReducer,
  SubmitAnswerReducer,
  GetInformationReducer,
  GetProfileReducer,
  GetVideoReducer,
  AddVitalsReducer,
  GetMessagesReducer,
  SendMessageReducer,
  GetStateReducer,
  GetVitalsHistoryReducer,
  PatientListReducer,
  PatientLoginReducer,
  LanguageReducer
})


const store = createStore(rootReducer,
  applyMiddleware(...middleware));


console.log(store.getState());
// /* Enable redux dev tools only in development.
//  * We suggest using the standalone React Native Debugger extension:
//  * https://github.com/jhen0409/react-native-debugger
//  */
// /* eslint-disable no-undef */
const composeEnhancers = (
  __DEV__ &&
  typeof (window) !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;
// /* eslint-enable no-undef */
//
const enhancer = composeEnhancers(...enhancers);

export default store;
