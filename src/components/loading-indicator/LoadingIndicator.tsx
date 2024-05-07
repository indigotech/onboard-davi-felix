import * as React from 'react';

import {View, ActivityIndicator} from 'react-native';

import {styles} from './styles';

export const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};
