import * as React from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import {loginFormStyles} from './styles';
import {validateLoginData} from '../validation';

interface LoginFormsProps {
  email: string;
  onEmailChange: (email: string) => void;
  password: string;
  onPasswordChange: (email: string) => void;
  loading: boolean;
  onLoginUser: () => void;
}

export const LoginForm = ({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onLoginUser,
  loading,
}: LoginFormsProps) => {
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  function handleFormValidation() {
    setEmailError('');
    setPasswordError('');

    const errors = validateLoginData({email, password});
    if (errors.email.length > 0) {
      setEmailError(errors.email[0]);
      return false;
    }
    if (errors.password.length > 0) {
      setPasswordError(errors.password[0]);
      return false;
    }

    return true;
  }

  function handleFormSubmit() {
    Keyboard.dismiss();
    const isFormValid = handleFormValidation();
    if (isFormValid) {
      onLoginUser();
    }
  }

  return (
    <KeyboardAvoidingView>
      <View style={loginFormStyles.inputContainer}>
        <View>
          <Text style={loginFormStyles.inputLabel}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={onEmailChange}
            style={loginFormStyles.input}
            autoCapitalize="none"
            inputMode="email"
            autoCorrect={false}
          />
          <Text style={loginFormStyles.errorsText}>{emailError}</Text>
        </View>
        <View>
          <Text style={loginFormStyles.inputLabel}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry
            style={loginFormStyles.input}
          />
          <Text style={loginFormStyles.errorsText}>{passwordError}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={loginFormStyles.submitButton}
        onPress={handleFormSubmit}
        disabled={loading}>
        {!loading ? (
          <Text style={loginFormStyles.submitButtoText}>Entrar</Text>
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
