import * as React from 'react';

import {SafeAreaView, ScrollView, Text} from 'react-native';

import {globalStyles} from '@src/globalStyles';
import {UserItem} from './components/UserItem';
import {homeStyles} from './styles';
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
  const {data, loading, error} = useQuery<ListUsersData>(GET_USERS);

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Lista de usuários</Text>
      <ScrollView style={homeStyles.userListContainer}>
        {data && data.users.nodes.length > 0 ? (
          data.users.nodes.map(user => (
            <UserItem name={user.name} email={user.email} key={user.id} />
          ))
        ) : (
          <Text>Sem usuários para listas</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
