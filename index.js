/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import {Platform} from 'react-native'
import { navigate } from './src/navigations/RootNavigation';
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    if(notification.data.productId)
      navigate('ProductDetail', { itemID: notification.data.productId})
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS==="ios",
});

AppRegistry.registerComponent(appName, () => App);
