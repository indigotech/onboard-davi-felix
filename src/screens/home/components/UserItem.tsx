import * as React from 'react';

import {View, Text} from 'react-native';
import {styles} from './styles';

interface UserItemProps {
  name: string;
  email: string;
}

export const UserItem = ({name, email}: UserItemProps) => {
  return (
    <View style={styles.userContainer}>
      <Text>
        <Text style={styles.mainText}>Nome:</Text> {name}
      </Text>
      <Text>
        <Text style={styles.mainText}>E-mail:</Text> {email}
      </Text>
    </View>
  );
};
