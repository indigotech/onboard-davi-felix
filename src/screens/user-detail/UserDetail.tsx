import * as React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Routes';

type UserDetailScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'UserDetail'
>;

import {SafeAreaView, Text} from 'react-native';
import {globalStyles} from '@src/globalStyles';

export const UserDetail = ({route}: UserDetailScreenProps) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text>User Detail: {route?.params.userId}</Text>
    </SafeAreaView>
  );
};
