import * as React from 'react';

import {Text, View} from 'react-native';

import {globalStyles} from '@src/globalStyles';
import {styles} from './styles';

export const AddUser = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Adicionar novo usuário</Text>
      <View style={styles.addUserContainer} />
    </View>
  );
};
