import * as React from 'react';

import {Text, View, SafeAreaView} from 'react-native';
import {LoginForm} from './components/LoginForm';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useMutation, gql} from '@apollo/client';

const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(data: $input) {
      token
    }
  }
`;

import {styles} from './styles';
import {marginWrapper} from '@src/marginWrapper';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Routes';

type LoginScreenProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;

export const Login = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loginUser, {data, loading, error}] = useMutation(LOGIN_USER, {
    onCompleted: handleLoginComplete,
    onError: () => {},
  });

  async function handleLoginComplete() {
    const token = data.login.token;
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
    <SafeAreaView style={marginWrapper.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Bem-vindo(a) à Taqtile</Text>

        <LoginForm
          email={email}
          onEmailChange={setEmail}
          password={password}
          onPasswordChange={setPassword}
          onLoginUser={handleLoginUser}
          loading={loading}
        />

        {error ? (
          <Text style={styles.feedbackText}>{error?.message}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
