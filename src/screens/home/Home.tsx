import * as React from 'react';

import {ActivityIndicator, SafeAreaView, ScrollView, Text} from 'react-native';

import {globalStyles} from '@src/globalStyles';
import {UserItem} from './components/UserItem';
import {homeStyles} from './styles';

import {gql, useQuery} from '@apollo/client';

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
  const {data, loading, error} = useQuery(GET_USERS);

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Lista de usuários</Text>
      <ScrollView style={homeStyles.userListContainer}>
        {data.users.nodes.map(user => (
          <UserItem name={user.name} email={user.email} key={user.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
