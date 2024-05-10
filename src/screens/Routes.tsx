import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {Login} from './login/Login';
import {Home} from './home/Home';
import {AddUser} from './add-user/AddUser';
import {UserDetail} from './user-detail/UserDetail';

export type RootStackParamsList = {
  Login: undefined;
  Home?: {
    updateUsers: boolean;
  };
  AddUser: undefined;
  UserDetail: {
    userId: number;
  };
};

export type ScreenProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>;

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{updateUsers: true}}
        />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
