import * as React from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';

import {styles} from './styles';

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
      <Text style={styles.inputLabel}>{fieldLabel}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        {...props}
      />
      <Text style={styles.errorsText}>{errorText}</Text>
    </View>
  );
};
