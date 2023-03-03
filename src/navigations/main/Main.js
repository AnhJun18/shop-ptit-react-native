import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeNavigation from '../home/HomeNavigation';
import ProfileNavigation from '../profile/ProfileNavigation';
import LoginNavigation from '../login/LoginNavigation';
import OrderScreen from '../../features/order/screen/OrderScreen';
import OrderHistoryScreen from '../../features/profile/OrderHistoryScreen';
import ChangePassScreen from '../../features/auth/screen/ChangePassScreen';
import ForgotPassScreen from '../../features/auth/screen/ForgotPassScreen';
import UserInforScreen from '../../features/profile/UserInforScreen';
import RegisterScreen from '../../features/auth/screen/RegisterScreen';
import StoreScreen from '../../features/store/screens/StoreScreen';
import ProductDetailScreen from '../../features/store/screens/ProductDetailScreen';
import ProfileScreen from '../../features/profile/ProfileScreen';
import CartScreen from '../../features/cart/CartScreen';
import AddressScreen from '../../features/user/screens/AddressScreen';


const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ChangePass"
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
          headerShown: false,
          tabBarHideOnKeyboard: true
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarLabel: 'Cửa hàng',
          
          headerShown: false,
          // tabBarStyle: { display: 'none' },
          tabBarHideOnKeyboard: true
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarBadge: 3,
          headerShown: false,

        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="LoginNavigation"
        component={LoginNavigation}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown: false,
          tabBarButton: () => { null }
        }}
      />
      <Tab.Screen
        name="ForgotPass"
        component={ForgotPassScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown: false,
          tabBarButton: () => { null }
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown: false,
          tabBarButton: () => { null }
        }}
      />
      <Tab.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown:false,
          tabBarButton:()=>{null}
        }}
      />
      <Tab.Screen
        name="ChangePass"
        component={ChangePassScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown: false,
          tabBarButton: () => { null }
        }}
      />
      <Tab.Screen
        name="UserInfor"
        component={UserInforScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown:false,
          tabBarButton:()=>{null},
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown: false,
          tabBarButton: () => { null },
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarBadge: 3,
          headerShown: false,
          tabBarButton: () => { null },
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          tabBarLabel: 'History new screen',
          tabBarBadge: 3,
          headerShown:false,
          tabBarButton:()=>{null},
          tabBarStyle: { display: 'none' },

          // tabBarButton:()=>{null}
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;