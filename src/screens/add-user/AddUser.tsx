import * as React from 'react';

import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';

import {globalStyles} from '@src/globalStyles';
import {addUserStyles} from './styles';
import {FormField} from '@src/components/form-field/FormField';
import DatePicker from 'react-native-date-picker';
import {formFieldStyles} from '@src/components/form-field/styles';
import RNPickerSelect from 'react-native-picker-select';
import {SubmitButton} from '@src/components/submit-button/SubmitButton';
import {SafeAreaView} from 'react-native-safe-area-context';

export const AddUser = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [birthDate, setBirthDate] = React.useState<Date>(new Date(Date.now()));
  const [phone, setPhone] = React.useState('');
  const [role, setRole] = React.useState<'user' | 'admin'>('user');

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
            errorText=""
            placeholder="Taki Tiler"
          />
          <FormField
            fieldLabel="E-mail"
            onChangeText={setEmail}
            value={email}
            errorText=""
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
            errorText=""
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
          </View>
          <FormField
            fieldLabel="Telefone"
            onChangeText={setPhone}
            value={phone}
            errorText=""
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
          </View>
        </ScrollView>
        <SubmitButton
          onFormSubmit={() => {}}
          text="Cadastrar"
          loading={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
