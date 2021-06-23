/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen'
// import Navigation from './Navigation';

import { API_ROOT } from './env';
import { setConfiguration } from './src/utils/configuration';
import configureStore from './src/redux/store';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler'
import Navigation from './Navigation';

// YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

class App extends React.Component {

  componentDidMount() {
    setConfiguration('API_ROOT', API_ROOT);
    setTimeout(() => SplashScreen.hide(), 2000);
    // console.disableYellowBox = true;
    setConfiguration('fcmToken', 'none');
  }

  render() {

    const store = require('./src/redux/store').default;

    return (

      <View style={{ flex: 1, backgroundColor: 'yellow' }}><Provider store={store}>
        <Navigation />
      </Provider></View>

    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
