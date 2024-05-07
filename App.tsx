import React from 'react';

import {StatusBar, useColorScheme} from 'react-native';

import {ApolloProvider} from '@apollo/client';
import {client} from './src//services/api';

import {Routes} from './src/screens/Routes';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </>
  );
}

export default App;
