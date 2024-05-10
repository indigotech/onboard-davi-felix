import styled from 'styled-components/native';

export const InputLabel = styled.Text`
  color: #777;
  font-size: ${({theme}) => theme.formLabelTextSize};
  margin-bottom: 12px;
`;

export const InputField = styled.TextInput`
  border-radius: 8px;
  border-color: #bcbcbc;
  color: #000;
  border-top-width: ${({theme}) => theme.formFieldBorderTop};
  border-bottom-width: ${({theme}) => theme.formFieldBorderBottom};
  border-right-width: ${({theme}) => theme.formFieldBorderRight};
  border-left-width: ${({theme}) => theme.formFieldBorderLeft};
  padding: 8px 4px;
  font-size: ${({theme}) => theme.formInputTextSize};
`;

export const ErrorsText = styled.Text`
  color: ${({theme}) => theme.formCaptionTextColor};
  margin-left: 8px;
  font-size: ${({theme}) => theme.formCaptionTextSize};
`;

export const DatePickerContainer = styled.View`
  align-items: center;
`;
