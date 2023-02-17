import LoginScreen from '../../features/login/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { useState } from 'react';
const Stack = createNativeStackNavigator();
function LoginNavigation(props) {
  return<Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator> 
}
export default LoginNavigation;