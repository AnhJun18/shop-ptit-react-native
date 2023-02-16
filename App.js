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
import { AuthContextProvider } from './src/context/AuthProvider';
import { navigationRef } from './src/navigations/RootNavigation';
function App() {
  console.log(store.getState())
  return (
    
    <Provider store={store}>
      <AuthContextProvider>
      <NavigationContainer ref={navigationRef}>
        <MyTabs></MyTabs>
      </NavigationContainer>
      </AuthContextProvider>
    </Provider>
  );
 
}

export default App;