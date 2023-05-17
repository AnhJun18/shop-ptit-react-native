import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}


async function  GetFCMToken() {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    if (!fcmtoken) {
        try {
            let fcmtoken = messaging().getToken();
            if (fcmtoken) {
                AsyncStorage.setItem("fcmtoken",fcmtoken);
            }else{}
        }catch(e){
            console.log(e)
        }
    }
}
export const NotificationLister=()=>{
     // Assume a message-notification contains a "type" property in the data payload of the screen to open

     messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        navigation.navigate(remoteMessage.data.type);
      });

      // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
       
      }
     
    });
    messaging().onMessage(async remoteMessage =>{
        console.log("thông báo mới",remoteMessage)
    })
}