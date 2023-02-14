/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, View } from 'react-native';
import MyTabs from './src/navigations/main/Main';
import { NavigationContainer } from '@react-navigation/native';
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
function App() {
  return (
    <NavigationContainer>
        <MyTabs></MyTabs>
    </NavigationContainer>
 
  );
}

export default App;