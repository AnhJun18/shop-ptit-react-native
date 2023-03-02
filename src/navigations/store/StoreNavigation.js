import ProductDetailScreen from '../../features/store/screens/ProductDetailScreen';
import StoreScreen from '../../features/store/screens/StoreScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function StoreNavigation(){
 return <Stack.Navigator>
    <Stack.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{
          headerShown:false
        }}
      />
     <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{
          headerShown:false
        }}
      />
 </Stack.Navigator>
}
export default StoreNavigation;