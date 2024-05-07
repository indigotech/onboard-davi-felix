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

interface ListUsersData {
  users: {nodes: User[]};
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
    }
  }
`;

const PAGE_SIZE = 10;

export const Home = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [users, setUsers] = React.useState<User[]>([]);
  const {data, loading, error, refetch} = useQuery<ListUsersData, PageData>(
    GET_USERS,
    {
      variables: {
        offset: currentPage * PAGE_SIZE,
        limit: PAGE_SIZE,
      },
      onCompleted: handleQueryCompleted,
      notifyOnNetworkStatusChange: true,
    },
  );

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
    setCurrentPage(currentPage + 1);
  }

  function handleQueryCompleted() {
    setUsers(oldUsers =>
      data ? [...oldUsers, ...data.users.nodes] : oldUsers,
    );
  }

  if (error) {
    showAlert();
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Lista de usuários</Text>
      <View style={styles.userListContainer}>
        <FlatList
          data={users || []}
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
