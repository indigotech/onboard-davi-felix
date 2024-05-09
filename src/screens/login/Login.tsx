import * as React from 'react';

import {Text, View, SafeAreaView} from 'react-native';
import {LoginForm} from './components/LoginForm';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useMutation} from '@apollo/client';

import {loginStyles} from './styles';
import {globalStyles} from '@src/globalStyles';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Routes';

import {
  LoginResponse,
  LoginVariables,
  LOGIN_USER_MUTATION,
} from '@src/graphql/login';

type LoginScreenProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;

export const Login = ({navigation}: LoginScreenProps) => {
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
      navigation.navigate('Home');
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
    <SafeAreaView style={globalStyles.container}>
      <View style={loginStyles.loginContainer}>
        <Text style={globalStyles.title}>Bem-vindo(a) à Taqtile</Text>

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
    </SafeAreaView>
  );
};
