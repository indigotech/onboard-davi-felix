import * as React from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';

import {formFieldStyles} from './styles';

interface FormFieldProps {
  errorText: string;
  fieldLabel: string;
}

export const FormField = ({
  value,
  onChangeText,
  errorText,
  fieldLabel,
  ...props
}: FormFieldProps & TextInputProps) => {
  return (
    <View>
      <Text style={formFieldStyles.inputLabel}>{fieldLabel}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={formFieldStyles.input}
        {...props}
      />
      <Text style={formFieldStyles.errorsText}>{errorText}</Text>
    </View>
  );
};