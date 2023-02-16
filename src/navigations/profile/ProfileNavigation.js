import LoginScreen from '../../features/login/LoginScreen';
import ProfileScreen from '../../features/profile/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../RootNavigation';
import { connect } from 'react-redux';
import { useState } from 'react';
const Stack = createNativeStackNavigator();
function ProfileNavigation(props) {
  const [state, setState] = useState();
  const isLogined = props.state.LoginReducer;
  return !isLogined ? <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator> :
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false
        }} />
    </Stack.Navigator>
}
export default connect(state => {
  return {
    state: state
  }
})(ProfileNavigation);