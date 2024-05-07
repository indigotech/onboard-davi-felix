import * as React from 'react';

import {SafeAreaView, Text} from 'react-native';

import {marginWrapper} from '../../../marginWrapper';

export const Home = () => {
  return (
    <SafeAreaView style={marginWrapper.container}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};
