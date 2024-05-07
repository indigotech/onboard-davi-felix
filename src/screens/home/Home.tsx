import * as React from 'react';

import {SafeAreaView, Text, Alert, FlatList, View} from 'react-native';

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

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  offset: number;
}

interface ListUsersData {
  users: {
    nodes: User[];
    pageInfo: PageInfo;
  };
}

interface PageData {
  offset: number;
  limit: number;
}

const GET_USERS = gql`
  query ListUsers($offset: Int, $limit: Int) {
    users(data: {offset: $offset, limit: $limit}) {
      nodes {
        id
        name
        email
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const Home = () => {
  const {data, loading, error, refetch, fetchMore} = useQuery<
    ListUsersData,
    PageData
  >(GET_USERS, {
    variables: {
      offset: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  function showAlert() {
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

  function handleEndReached() {
    if (data?.users.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          offset: data?.users.nodes.length,
        },
      });
    }
  }

  if (error) {
    showAlert();
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Lista de usuários</Text>
      <View style={styles.userListContainer}>
        <FlatList
          data={data?.users.nodes || []}
          renderItem={({item}) => (
            <UserItem name={item.name} email={item.email} />
          )}
          keyExtractor={item => String(item.id)}
          ListEmptyComponent={<Text>Sem usuários para listar</Text>}
          onEndReached={handleEndReached}
        />
        {loading ? <LoadingIndicator /> : null}
      </View>
    </SafeAreaView>
  );
};
