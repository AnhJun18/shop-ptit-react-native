import HomeScreen from "../../features/home/screen/HomeScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from "../../features/cart/CartScreen";
const Stack = createNativeStackNavigator();

function HomeNavigation(){
 return <Stack.Navigator>
    <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown:false
        }}
      />
    <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown:false
        }}
      />
 </Stack.Navigator>
}
export default HomeNavigation;