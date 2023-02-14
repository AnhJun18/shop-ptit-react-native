import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/home/Home';
import SettingScreen from '../features/home/Setting';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
            case 'Profile':
              return <Icon name={'user'} size={25} color={color} />;    
            default:
              return <Icon name={'home'} size={25} color={color} />;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}

    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name="Store"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Cửa hàng',
          tabBarBadge: 3,
        }}
      />
     <Tab.Screen
        name="Cart"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;