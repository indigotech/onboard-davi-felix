import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from './login/Login';
import {Home} from './home/Home';
import {AddUser} from './add-user/AddUser';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  AddUser: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddUser" component={AddUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
