import HomeScreen from "../../features/home/screen/HomeScreen";
import SettingScreen from "../../features/home/screen/SettingScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown:false
        }}
      />
 </Stack.Navigator>
}
export default HomeNavigation;