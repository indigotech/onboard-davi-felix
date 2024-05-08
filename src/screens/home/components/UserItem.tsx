import * as React from 'react';

import {View, Text} from 'react-native';
import {userItemStyles} from './styles';

interface UserItemProps {
  name: string;
  email: string;
}

export const UserItem = ({name, email}: UserItemProps) => {
  return (
    <View style={userItemStyles.userContainer}>
      <Text>
        <Text style={userItemStyles.mainText}>Nome:</Text> {name}
      </Text>
      <Text>
        <Text style={userItemStyles.mainText}>E-mail:</Text> {email}
      </Text>
    </View>
  );
};
