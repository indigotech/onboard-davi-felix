import * as React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import {loginFormStyles} from './styles';
import {validateLoginData} from '../validation';
import {FormField} from '@src/components/form-field/FormField';

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
        <FormField
          value={email}
          onChangeText={onEmailChange}
          autoCapitalize="none"
          inputMode="email"
          autoCorrect={false}
          fieldLabel="E-mail"
          errorText={emailError}
        />
        <FormField
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry
          fieldLabel="Senha"
          errorText={passwordError}
        />
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
