import * as React from 'react';

import {KeyboardAvoidingView, ScrollView, Alert} from 'react-native';

import {FormField} from '@src/components/form-field/FormField';
import {SubmitButton} from '@src/components/submit-button/SubmitButton';
import {PickerSelectField} from '@src/components/form-field/PickerSelectField';
import {DatePickerField} from '@src/components/form-field/DatePickerField';

import {GlobalContainer, Title} from '@src/globalStyles';
import {addUserStyles} from './styles';

import {validateNewUser, ErrorObjectIndex, noErrors} from './validation';

import {ScreenProps} from '../Routes';

import {ApolloError, useMutation} from '@apollo/client';

import {
  AddUserResponse,
  AddUserVariables,
  ADD_USER_MUTATION,
} from '@src/graphql/addUser';

export const AddUser = ({navigation}: ScreenProps<'AddUser'>) => {
  const [addUser, {loading, reset}] = useMutation<
    AddUserResponse,
    AddUserVariables
  >(ADD_USER_MUTATION, {
    onCompleted: handleCreateNewUserComplete,
    onError: handleCreateNewUserError,
  });

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [birthDate, setBirthDate] = React.useState<Date>(new Date(Date.now()));
  const [phone, setPhone] = React.useState('');
  const [role, setRole] = React.useState<'user' | 'admin'>('user');

  const [errors, setErrors] =
    React.useState<Record<ErrorObjectIndex, string[]>>(noErrors);

  function handleCreateNewUserComplete() {
    navigation.navigate('Home');
  }

  function handleCreateNewUserError(error: ApolloError) {
    Alert.alert('Erro', `Houve um erro: ${error.message}`, [
      {
        text: 'Ok',
        onPress: reset,
        style: 'default',
      },
    ]);
  }

  function handleCreateNewUser() {
    addUser({
      variables: {
        data: {
          name,
          email,
          phone,
          role,
          password,
          birthDate,
        },
      },
    });
  }

  function handleSubmitForm() {
    const {isValid, errors: validationErrors} = validateNewUser({
      name,
      email,
      phone,
      role,
      password,
      birthDate,
    });
    if (isValid) {
      handleCreateNewUser();
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <GlobalContainer>
      <Title>Adicionar novo usuário</Title>
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
            errorText={errors.name?.[0] ?? ''}
            placeholder="Taki Tiler"
          />
          <FormField
            fieldLabel="E-mail"
            onChangeText={setEmail}
            value={email}
            errorText={errors.email?.[0] ?? ''}
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
            errorText={errors.password?.[0] ?? ''}
          />
          <DatePickerField
            date={birthDate}
            onDateChange={setBirthDate}
            mode="date"
            errorText={errors.birthDate?.[0] ?? ''}
            fieldLabel="Data de nascimento"
          />
          <FormField
            fieldLabel="Telefone"
            onChangeText={setPhone}
            value={phone}
            errorText={errors.phone?.[0] ?? ''}
            inputMode="numeric"
            placeholder="11970707070"
          />
          <PickerSelectField
            fieldLabel="Seleciona o papel do usuário"
            errorText={errors.role?.[0] ?? ''}
            onValueChange={setRole}
            items={[
              {label: 'Usuário', value: 'user'},
              {label: 'Administrador', value: 'admin'},
            ]}
            value={role}
            placeholderString="Selecione um papel para o usuário"
          />
        </ScrollView>
        <SubmitButton
          onFormSubmit={handleSubmitForm}
          text="Cadastrar"
          loading={loading}
        />
      </KeyboardAvoidingView>
    </GlobalContainer>
  );
};
