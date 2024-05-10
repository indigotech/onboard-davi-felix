import * as React from 'react';
import {View} from 'react-native';

import {ErrorsText, InputLabel} from './styles';

export interface GenericFieldProps {
  errorText: string;
  fieldLabel: string;
  children: React.ReactNode;
}

export const GenericField = ({
  errorText,
  fieldLabel,
  children,
}: GenericFieldProps) => {
  return (
    <View>
      <InputLabel>{fieldLabel}</InputLabel>
      {children}
      <ErrorsText>{errorText}</ErrorsText>
    </View>
  );
};
