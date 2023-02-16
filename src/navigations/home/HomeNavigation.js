import HomeScreen from "../../features/home/screen/HomeScreen";
import SettingScreen from "../../features/home/screen/SettingScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import DataStorage from "../../common/utility/DataStorage";
import { useDispatch } from 'react-redux';
function HomeNavigation(){
  const dispath = useDispatch();
  (async ()=>{
    const [accessToken,refreshToken,userInfo]= await DataStorage.GetDataStorage(['@accessToken','@refreshToken','@userInfo']);
    if (accessToken!=null){
      dispath({type:'login'});
    }
  })().catch(err=>console.log(err))
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