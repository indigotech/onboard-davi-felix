import styled from 'styled-components/native';

export const GlobalContainer = styled.SafeAreaView`
  margin: ${({theme}) => theme.containerMargin};
  flex: 1;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.titleColor};
  font-size: ${({theme}) => theme.titleTextSize};
  margin: ${({theme}) => theme.titleMarginVertical} 0;
  font-weight: bold;
`;
