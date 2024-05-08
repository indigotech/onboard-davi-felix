import * as React from 'react';

import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import {FormField} from '@src/components/form-field/FormField';
import {SubmitButton} from '@src/components/submit-button/SubmitButton';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';

import {globalStyles} from '@src/globalStyles';
import {addUserStyles} from './styles';
import {formFieldStyles} from '@src/components/form-field/styles';

import {validateNewUser} from './validation';

interface ErrorObject {
  email: string[];
  name: string[];
  phone: string[];
  role: string[];
  password: string[];
  birthDate: string[];
}
type ErrorObjectIndex =
  | 'email'
  | 'name'
  | 'phone'
  | 'password'
  | 'birthDate'
  | 'role';

type ErrorState = ErrorObject | null;

/**
 * Returns the first error of the array containing the errors of the field `name`,
 * and returns empty string if there are no errrors
 */
function getError(errors: ErrorState, name: ErrorObjectIndex): string {
  if (errors) {
    return errors[name].length ? errors[name][0] : '';
  }
  return '';
}

export const AddUser = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [birthDate, setBirthDate] = React.useState<Date>(new Date(Date.now()));
  const [phone, setPhone] = React.useState('');
  const [role, setRole] = React.useState<'user' | 'admin'>('user');

  const [errors, setErrors] = React.useState<ErrorState>(null);

  function handleSubmitForm() {
    const {isValid, errors: validationErrors} = validateNewUser({
      name,
      email,
      phone,
      role: role,
      password,
      birthDate,
    });
    if (isValid) {
      // Form is valid
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Adicionar novo usuário</Text>
      <KeyboardAvoidingView
        style={addUserStyles.keyboardAvoigindViewStyles}
        behavior="padding"
        enabled
        keyboardVerticalOffset={50}>
        <ScrollView style={addUserStyles.addUserContainer}>
          <FormField
            fieldLabel="Nome"
            onChangeText={setName}
            value={name}
            errorText={getError(errors, 'name')}
            placeholder="Taki Tiler"
          />
          <FormField
            fieldLabel="E-mail"
            onChangeText={setEmail}
            value={email}
            errorText={getError(errors, 'email')}
            inputMode="email"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="mail@taqtile.com.br"
          />
          <FormField
            fieldLabel="Senha"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            errorText={getError(errors, 'password')}
          />
          <View>
            <Text style={formFieldStyles.inputLabel}>Data de nascimento</Text>
            <View style={addUserStyles.datePickerContainer}>
              <DatePicker
                date={birthDate}
                onDateChange={setBirthDate}
                mode="date"
              />
            </View>
            <Text style={formFieldStyles.errorsText}>
              {getError(errors, 'birthDate')}
            </Text>
          </View>
          <FormField
            fieldLabel="Telefone"
            onChangeText={setPhone}
            value={phone}
            errorText={getError(errors, 'phone')}
            inputMode="numeric"
            placeholder="11970707070"
          />
          <View>
            <Text style={formFieldStyles.inputLabel}>Papel</Text>
            <RNPickerSelect
              onValueChange={setRole}
              items={[
                {label: 'Usuário', value: 'user'},
                {label: 'Administrador', value: 'admin'},
              ]}
              value={role}
              placeholder={{label: 'Selecione um papel para o usuário'}}
              style={{
                inputIOSContainer: formFieldStyles.input,
                inputAndroidContainer: formFieldStyles.input,
              }}
            />
            <Text style={formFieldStyles.errorsText}>
              {getError(errors, 'role')}
            </Text>
          </View>
        </ScrollView>
        <SubmitButton
          onFormSubmit={handleSubmitForm}
          text="Cadastrar"
          loading={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
