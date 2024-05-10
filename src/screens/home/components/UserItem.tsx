import * as React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {userItemStyles} from './styles';

interface UserItemProps {
  name: string;
  email: string;
  onPress: () => void;
}

export const UserItem = ({name, email, onPress}: UserItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={userItemStyles.userContainer}>
        <Text style={userItemStyles.usetItemText}>
          <Text style={userItemStyles.mainText}>Nome:</Text> {name}
        </Text>
        <Text style={userItemStyles.usetItemText}>
          <Text style={userItemStyles.mainText}>E-mail:</Text> {email}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
