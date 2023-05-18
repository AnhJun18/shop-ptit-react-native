/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MyTabs from './src/navigations/Main';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/reducer';
import { Provider } from 'react-redux';
import { AuthContextProvider } from './src/context/AuthProvider';
import { navigationRef } from './src/navigations/RootNavigation';
import {requestUserPermission,NotificationLister} from './src/common/utility/pushNotificationHelper'
import { useEffect } from 'react';
function App() {
  useEffect(()=>{
    requestUserPermission();
    NotificationLister();
  })
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