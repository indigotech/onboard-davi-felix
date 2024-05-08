import * as React from 'react';

import {View, ActivityIndicator} from 'react-native';

import {loadingIndicatorStyles} from './styles';

export const LoadingIndicator = () => {
  return (
    <View style={loadingIndicatorStyles.container}>
      <ActivityIndicator />
    </View>
  );
};
