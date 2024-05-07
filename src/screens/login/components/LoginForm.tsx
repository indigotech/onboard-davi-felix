import * as React from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {styles} from './styles';
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
    const isFormValid = handleFormValidation();
    if (isFormValid) {
      onLoginUser();
    }
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={onEmailChange}
            style={styles.input}
            autoCapitalize="none"
            inputMode="email"
            autoCorrect={false}
          />
          <Text style={styles.errorsText}>{emailError}</Text>
        </View>
        <View>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry
            style={styles.input}
          />
          <Text style={styles.errorsText}>{passwordError}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
        {!loading ? (
          <Text style={styles.submitButtoText}>Entrar</Text>
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
    </View>
  );
};
