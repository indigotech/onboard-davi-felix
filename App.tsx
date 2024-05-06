import React from 'react';

import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Login} from './src/screens/login/Login';
import {marginWrapper} from './marginWrapper';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={marginWrapper.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Login />
    </SafeAreaView>
  );
}

export default App;
