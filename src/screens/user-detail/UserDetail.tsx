import * as React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Routes';

import {LoadingIndicator} from '@src/components/loading-indicator/LoadingIndicator';

import {Alert, SafeAreaView, Text, View} from 'react-native';
import {globalStyles} from '@src/globalStyles';

import {gql, useQuery} from '@apollo/client';
import {userDetailStyles} from './styles';

type UserDetailScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'UserDetail'
>;

interface GetUserVariables {
  userId: number;
}

interface GetUserResponse {
  user: {
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin';
    password: string;
    birthDate: string;
  };
}

const FETCH_USER = gql`
  query GetUser($userId: ID) {
    user(id: $userId) {
      name
      email
      birthDate
      id
      phone
      role
    }
  }
`;

export const UserDetail = ({route}: UserDetailScreenProps) => {
  const {userId} = route?.params;

  const {data, loading, refetch} = useQuery<GetUserResponse, GetUserVariables>(
    FETCH_USER,
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

  function formatPhoneNumber(phone: string) {
    const ddd = phone.slice(0, 2);
    const firstPart = phone.slice(2, 7);
    const secondPart = phone.slice(7, 11);
    return `(${ddd}) ${firstPart}-${secondPart}`;
  }

  function formatDate(dateString: string) {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString('pt-BR');
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
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Detalhes do usuário</Text>
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
    </SafeAreaView>
  );
};
