/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from './app/navigation/AppNavigator';
import store from './app/store';

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
          <StatusBar barStyle="default" backgroundColor="#fff" translucent={false}  />
          <AppNavigator />
        </SafeAreaView>
    </SafeAreaProvider>
  </Provider>
);

export default App;
