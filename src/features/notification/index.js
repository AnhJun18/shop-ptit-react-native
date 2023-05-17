import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification'
import BackgroundFetch from "react-native-background-fetch";

// Thiết lập tác vụ background fetch

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
function Notification() {
  console.log('call');
  PushNotification.createChannel({ channelId: 'uzzapp', channelName: 'Uzzapp',
   channelDescription: 'Notification for special message', importance: 4, vibrate: true, },
    (created) => console.log()
    );
  const subscriber = firestore()
    .collection('product').doc('123')
    .onSnapshot(documentSnapshot => {
      PushNotification.localNotification(
        { channelId: 'uzzapp', channelName: 'Uzzapp', vibrate: true, allowWhileIdle: true, message:documentSnapshot.data().name }
      )
    }, err => console.log(err));
}
BackgroundFetch.configure({
  minimumFetchInterval: 15,
  stopOnTerminate: false,
  startOnBoot: true,
  enableHeadless: true, // Bật tính năng headless
}, async (taskId) => {
  console.log("[BackgroundFetch] Task #" + taskId);
  // Thực hiện các tác vụ ở chế độ headless
  Notification()
  BackgroundFetch.finish(taskId);
}, (error) => {
  console.log("[BackgroundFetch] ", error);
});


// Đăng ký tác vụ background fetch
const registerBackgroundTask = async () => {
  try {
    await BackgroundFetch.scheduleTask({
      taskId: "com.shopptit",
      forceAlarmManager: true,
      delay: 5000
    });
  } catch (e) {
    console.error("[BackgroundFetch] Failed to schedule task:", e);
  }
}

// Gọi phương thức để đăng ký tác vụ
registerBackgroundTask();
