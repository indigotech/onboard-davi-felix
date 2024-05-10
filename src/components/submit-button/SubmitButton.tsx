import * as React from 'react';

import {ActivityIndicator} from 'react-native';

import {SubmitButtonElement, SubmitButtonText} from './styles';

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
    <SubmitButtonElement onPress={onFormSubmit} disabled={loading}>
      {!loading ? (
        <SubmitButtonText>{text}</SubmitButtonText>
      ) : (
        <ActivityIndicator />
      )}
    </SubmitButtonElement>
  );
};
