import * as React from 'react';

import {Text, View, TextInput, TouchableOpacity} from 'react-native';

import {styles} from './/styles';

export const Login = () => {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Bem-vindo(a) à Taqtile</Text>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            inputMode="email"
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput style={styles.input} secureTextEntry />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtoText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};
