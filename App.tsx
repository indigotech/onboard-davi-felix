import React from 'react';

import {StatusBar, useColorScheme} from 'react-native';

import {ApolloProvider} from '@apollo/client';
import {client} from './src//services/api';

import {Routes} from './src/screens/Routes';

import {ThemeProvider} from 'styled-components';
import {defaultTheme} from '@src/themes/default';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={defaultTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
