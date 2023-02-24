import React  from 'react';
import OrderScreen from '../../features/order/screen/OrderScreen';
import AddressScreen from '../../features/user/screens/AddressScreen';
import LoginScreen from '../../features/login/LoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../../features/home/screen/SettingScreen'
const Stack = createNativeStackNavigator();
function TestNavigation({ navigation, route }) {
  // React.useLayoutEffect(() => {
  //   const routeName = route.name;
  //   console.log(route)
  //   if (routeName == "OrderScreen") {
  //     navigation.setOptions({ tabBarStyle: { display: 'none' }});
  //   } else {
  //     navigation.setOptions({ tabBarStyle: { display: 'flex' }});
  //   }
  // }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown: false,
        }} />
    </Stack.Navigator>
  )
}
export default TestNavigation