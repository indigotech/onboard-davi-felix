import * as React from 'react';

import {SafeAreaView, ScrollView, Text, Alert} from 'react-native';

import {globalStyles} from '@src/globalStyles';
import {styles} from './styles';

import {UserItem} from './components/UserItem';
import {LoadingIndicator} from '@src/components/loading-indicator/LoadingIndicator';

import {gql, useQuery} from '@apollo/client';

interface User {
  id: number;
  name: string;
  email: string;
}

interface ListUsersData {
  users: {nodes: User[]};
}

const GET_USERS = gql`
  query ListUsers {
    users {
      nodes {
        id
        name
        email
      }
    }
  }
`;

export const Home = () => {
  const {data, loading, error, refetch} = useQuery<ListUsersData>(GET_USERS, {
    notifyOnNetworkStatusChange: true,
  });

  const showAlert = () =>
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

  if (error) {
    showAlert();
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Lista de usuários</Text>
      <ScrollView style={styles.userListContainer}>
        {data && data.users.nodes.length > 0 ? (
          data.users.nodes.map(user => (
            <UserItem name={user.name} email={user.email} key={user.id} />
          ))
        ) : (
          <Text>Sem usuários para listar</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
