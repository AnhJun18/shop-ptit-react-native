import messaging, { firebase } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  PushNotification  from 'react-native-push-notification';
import { navigate } from '../../navigations/RootNavigation';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken()
    
  }
}

subscribeLocalChannel = async () => {
  await PushNotification.createChannel(
      {
        channelId: 'channel_01', // The ID of the channel
        channelName: 'Notify Local', // The name of the channel
        channelDescription: 'Your Channel Description', // The description of the channel
        soundName: 'default', // The sound to be played for notifications
        importance: 4, // The importance level of the notifications
        vibrate: true, // Whether to enable vibration for notifications
      },
      (created) => {
        console.log(`Notification channel ${created.channelId} created successfully.`);
      }
    );
}

subscribeToTopic = async () => {
  await messaging()
    .subscribeToTopic('new-product')
    .then(() => console.log('Subscribed to topic!'));
}

async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem("fcmtoken");
  if (!fcmtoken) {
    try {

      fcmtoken = await messaging().getToken();


      if (fcmtoken) {
        await AsyncStorage.setItem("fcmtoken", fcmtoken);
        await subscribeToTopic()
        await subscribeLocalChannel()

        console.log("Đã đăng ký")
      } else {
        
       }
    } catch (e) {
      console.log(e)
    }
  }
}
export const NotificationLister = () => {

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
        if(remoteMessage.data.productId)
            navigate('ProductDetail', { itemID: remoteMessage.data.productId})

      }

    });
  messaging().onMessage(async remoteMessage => {
  console.log("thông báo mới////////////////////////////")
  const {title,body,android:{imageUrl}}= remoteMessage.notification
  PushNotification.localNotification({
    title: title,
    message: body,
    bigPictureUrl:imageUrl,
    channelId: 'channel_01', 
    data:{
      productId: remoteMessage.data?.productId
    }
  });

  })
}