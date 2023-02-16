/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MyTabs from './src/navigations/main/Main';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/reducer';
import { Provider } from 'react-redux';

function App() {
 
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs></MyTabs>
      </NavigationContainer>
    </Provider>
  );
 
}

export default App;