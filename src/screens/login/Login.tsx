import * as React from 'react';

import {Text, View, TextInput, TouchableOpacity} from 'react-native';

import {styles} from './/styles';
import {validateLoginData} from './validation';

export const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleFormSubmit = () => {
    // Reseting errors
    setEmailError('');
    setPasswordError('');

    const errors = validateLoginData({email, password});
    if (errors.email.length > 0) {
      setEmailError(errors.email[0]);
    }
    if (errors.password.length > 0) {
      setPasswordError(errors.password[0]);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Bem-vindo(a) à Taqtile</Text>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
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
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Text style={styles.errorsText}>{passwordError}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
        <Text style={styles.submitButtoText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};
