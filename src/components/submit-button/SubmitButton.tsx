import * as React from 'react';

import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import {submitButtonStyles} from './styles';

interface SubmitButtonProps {
  loading: boolean;
  onFormSubmit: () => void;
  text: string;
}

export const SubmitButton = ({
  onFormSubmit,
  loading,
  text,
}: SubmitButtonProps) => {
  return (
    <TouchableOpacity
      style={submitButtonStyles.submitButton}
      onPress={onFormSubmit}
      disabled={loading}>
      {!loading ? (
        <Text style={submitButtonStyles.submitButtoText}>{text}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};
