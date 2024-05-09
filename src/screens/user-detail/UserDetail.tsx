import * as React from 'react';

import {ScreenProps} from '../Routes';

import {LoadingIndicator} from '@src/components/loading-indicator/LoadingIndicator';

import {Alert, Text, View} from 'react-native';
import {GlobalContainer, Title} from '@src/globalStyles';

import {userDetailStyles} from './styles';

import {useQuery} from '@apollo/client';

import {formatDate, formatPhoneNumber} from '@src/utils/formatting';

import {
  GetUserResponse,
  GetUserVariables,
  FETCH_USER_QUERY,
} from '@src/graphql/userDetail';

export const UserDetail = ({route}: ScreenProps<'UserDetail'>) => {
  const {userId} = route?.params;

  const {data, loading, refetch} = useQuery<GetUserResponse, GetUserVariables>(
    FETCH_USER_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      onError: handleQueryError,
      variables: {
        userId,
      },
    },
  );

  const user = data?.user;

  function handleQueryError() {
    Alert.alert(
      'Erro',
      'Houve um erro na requisição para listagem dos usuários',
      [
        {
          text: 'Tentar novamente',
          onPress: () => {
            refetch();
          },
          style: 'default',
        },
      ],
    );
  }

  const roleLabels = {
    admin: 'Administrador',
    user: 'Usuário',
    default: 'Não definido',
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <GlobalContainer>
      <Title>Detalhes do usuário</Title>
      <View>
        <View style={userDetailStyles.userDetailsContainer}>
          <Text>
            <Text style={userDetailStyles.propertyTitle}>ID:</Text> {userId}
          </Text>

          <Text>
            <Text style={userDetailStyles.propertyTitle}>Nome:</Text>{' '}
            {user?.name}
          </Text>

          <Text>
            <Text style={userDetailStyles.propertyTitle}>E-mail:</Text>{' '}
            {user?.email}
          </Text>

          <Text>
            <Text style={userDetailStyles.propertyTitle}>
              Data de nascimento:
            </Text>{' '}
            {formatDate(user?.birthDate ?? '')}
          </Text>

          <Text>
            <Text style={userDetailStyles.propertyTitle}>Permissão:</Text>{' '}
            {roleLabels[user?.role ?? 'default']}
          </Text>

          <Text>
            <Text style={userDetailStyles.propertyTitle}>Telefone:</Text>{' '}
            {formatPhoneNumber(user?.phone ?? '')}
          </Text>
        </View>
      </View>
    </GlobalContainer>
  );
};
