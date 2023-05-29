/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
<<<<<<< HEAD
import Notification from './src/features/notification'
=======
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

>>>>>>> 81b6ba0e083fb3e61b1ae5d52f1f2f652b3f1e60
AppRegistry.registerComponent(appName, () => App);
