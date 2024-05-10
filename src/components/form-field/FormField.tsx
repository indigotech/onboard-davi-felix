import * as React from 'react';
import {TextInputProps} from 'react-native';

import {GenericField} from './GenericField';

import {InputField} from './styles';

interface FormFieldProps extends TextInputProps {
  errorText: string;
  fieldLabel: string;
}

export const FormField = ({
  value,
  onChangeText,
  errorText,
  fieldLabel,
  ...props
}: FormFieldProps) => {
  return (
    <GenericField errorText={errorText} fieldLabel={fieldLabel}>
      <InputField
        value={value}
        onChangeText={onChangeText}
        {...props}
        placeholderTextColor="#a6a6a6"
      />
    </GenericField>
  );
};
