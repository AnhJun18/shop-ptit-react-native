import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from '../../features/home/screen/SettingScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeNavigation from '../home/HomeNavigation';
import ProfileNavigation from '../profile/ProfileNavigation';
import LoginNavigation from '../login/LoginNavigation';
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let color = focused
                ? '#0d99ff'
                : '#333';
          switch (route.name) {
            case 'Home':  
              return <Icon name={'home'} size={25} color={color} />;
            case 'Store':
              return <Icon name={'shopping-bag'} size={25} color={color} />;    
            case 'Cart':
              return <Icon name={'shopping-cart'} size={25} color={color} />;    
            case 'ProfileNavigation':
              return <Icon name={'user'} size={25} color={color} />;    
            default:
              return <Icon name={'home'} size={25} color={color} />;
          }
        },
        tabBarActiveTintColor: '#0d99ff',
        tabBarInactiveTintColor: '#333',
      })}

    >
      <Tab.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{
          tabBarLabel: 'Trang chủ',
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Store"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Cửa hàng',
          tabBarBadge: 3,
          headerShown:false
        }}
      />
     <Tab.Screen
        name="Cart"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarBadge: 3,
          headerShown:false
        }}
      />
      <Tab.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown:false
        }}
      />
      <Tab.Screen
        name="LoginNavigation"
        component={LoginNavigation}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown:false,
          tabBarButton:()=>{null}
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;