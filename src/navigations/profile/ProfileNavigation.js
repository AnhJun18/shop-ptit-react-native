import LoginScreen from '../../features/auth/screen/LoginScreen';
import ProfileScreen from '../../features/profile/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../RootNavigation';
import { connect } from 'react-redux';
import { useState } from 'react';
const Stack = createNativeStackNavigator();
function ProfileNavigation(props) {
  return <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false
      }} />
  </Stack.Navigator>
}
export default ProfileNavigation