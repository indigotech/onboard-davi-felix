import * as React from 'react';

import {Text, View} from 'react-native';
import {LoginForm} from './components/LoginForm';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useMutation} from '@apollo/client';

import {loginStyles} from './styles';
import {GlobalContainer, Title} from '@src/globalStyles';

import {ScreenProps} from '../Routes';

import {
  LoginResponse,
  LoginVariables,
  LOGIN_USER_MUTATION,
} from '@src/graphql/login';

export const Login = ({navigation}: ScreenProps<'Login'>) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loginUser, {data, loading, error}] = useMutation<
    LoginResponse,
    LoginVariables
  >(LOGIN_USER_MUTATION, {
    onCompleted: handleLoginComplete,
    onError: () => {},
  });

  async function handleLoginComplete() {
    const token = data?.login.token ?? '';
    try {
      await AsyncStorage.setItem('ONBOARDING-APP:accessToken', token);
      navigation.navigate('Home', {updateUsers: true});
    } catch {
      console.log('Error saving token');
    }
  }

  function handleLoginUser() {
    loginUser({
      variables: {
        input: {email, password},
      },
    });
  }

  return (
    <GlobalContainer>
      <Title>Bem-vindo(a) à Taqtile</Title>
      <View style={loginStyles.loginContainer}>
        <LoginForm
          email={email}
          onEmailChange={setEmail}
          password={password}
          onPasswordChange={setPassword}
          onLoginUser={handleLoginUser}
          loading={loading}
        />

        {error ? (
          <Text style={loginStyles.feedbackText}>{error?.message}</Text>
        ) : null}
      </View>
    </GlobalContainer>
  );
};
