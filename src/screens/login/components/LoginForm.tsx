import * as React from 'react';

import {Keyboard, KeyboardAvoidingView} from 'react-native';

import {InputContainer} from './styles';
import {validateLoginData} from '../validation';
import {FormField} from '@src/components/form-field/FormField';
import {SubmitButton} from '@src/components/submit-button/SubmitButton';

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
      <InputContainer>
        <FormField
          value={email}
          onChangeText={onEmailChange}
          autoCapitalize="none"
          inputMode="email"
          autoCorrect={false}
          fieldLabel="E-mail"
          errorText={emailError}
          placeholder="mail@taqtile.com.br"
        />
        <FormField
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry
          fieldLabel="Senha"
          errorText={passwordError}
          autoCapitalize="none"
        />
      </InputContainer>

      <SubmitButton
        onFormSubmit={handleFormSubmit}
        loading={loading}
        text="Entrar"
      />
    </KeyboardAvoidingView>
  );
};
