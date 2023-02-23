import React  from 'react';
import OrderScreen from '../../features/order/screen/OrderScreen';
import AddressScreen from '../../features/user/screens/AddressScreen';
import LoginScreen from '../../features/login/LoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
        name="AddressScreen"
        component={AddressScreen}
        options={{
          headerShown: false,
        }} />
    </Stack.Navigator>
  )
}
export default TestNavigation