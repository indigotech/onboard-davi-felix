import * as React from 'react';

import {GenericField} from './GenericField';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';

import {DatePickerContainer} from './styles';

interface DatePickerFieldProps extends DatePickerProps {
  errorText: string;
  fieldLabel: string;
}

export const DatePickerField = ({
  errorText,
  fieldLabel,
  date,
  onDateChange,
  ...props
}: DatePickerFieldProps) => {
  return (
    <GenericField errorText={errorText} fieldLabel={fieldLabel}>
      <DatePickerContainer>
        <DatePicker
          date={date}
          onDateChange={onDateChange}
          mode="date"
          {...props}
        />
      </DatePickerContainer>
    </GenericField>
  );
};
