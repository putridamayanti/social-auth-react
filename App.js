import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { startAuthorize, getAccessToken } from './src/services/Github';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return(
      <>
        <StatusBar barStyle="light-content" />
        <AppContainer/>
      </>
    )
  }
}