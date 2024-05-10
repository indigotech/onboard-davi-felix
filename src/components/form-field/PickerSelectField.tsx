import * as React from 'react';

import RNPickerSelect, {PickerSelectProps} from 'react-native-picker-select';

import {GenericField} from './GenericField';

interface PickerSelectFieldProps extends PickerSelectProps {
  errorText: string;
  fieldLabel: string;
  placeholderString: string;
}

const pickerContainerStyle = {
  borderRadius: 8,
  borderColor: '#bcbcbc',
  borderWidth: 1,
  padding: 8,
};

export const PickerSelectField = ({
  value,
  onValueChange,
  errorText,
  items,
  fieldLabel,
  placeholderString,
  ...props
}: PickerSelectFieldProps) => {
  return (
    <GenericField errorText={errorText} fieldLabel={fieldLabel}>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        value={value}
        placeholder={{label: placeholderString}}
        style={{
          inputIOSContainer: pickerContainerStyle,
          inputAndroidContainer: pickerContainerStyle,
          inputAndroid: {color: 'black'},
          inputIOS: {color: 'black'},
        }}
        {...props}
      />
    </GenericField>
  );
};
