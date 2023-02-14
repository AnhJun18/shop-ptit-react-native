import LoginScreen from '../../features/login/LoginScreen';
import ProfileScreen from '../../features/profile/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function ProfileNavigation(){
 return <Stack.Navigator>
    <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
            headerShown:false
        }}
      />
     <Stack.Screen
         name="Profile"
         component={ProfileScreen}
         options={{
            headerShown:false
         }}
       />
    
 </Stack.Navigator>
}
export default ProfileNavigation;