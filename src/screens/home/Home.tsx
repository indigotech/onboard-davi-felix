import * as React from 'react';

import {SafeAreaView, Text, Alert, FlatList, View} from 'react-native';

import {globalStyles} from '@src/globalStyles';
import {UserItem} from './components/UserItem';
import {homeStyles} from './styles';
import {LoadingIndicator} from '@src/components/loading-indicator/LoadingIndicator';
import {FloatingActionButton} from '@src/components/floating-action-button/FloatingActionButton';

import {gql, useQuery} from '@apollo/client';

interface User {
  id: number;
  name: string;
  email: string;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  offset: number;
  limit: number;
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

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Routes';

type HomeScreenProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

const PAGE_SIZE = 10;

export const Home = ({navigation}: HomeScreenProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [users, setUsers] = React.useState<User[]>([]);
  const {data, loading, refetch} = useQuery<ListUsersData, PageData>(
    GET_USERS,
    {
      variables: {
        offset: currentPage * PAGE_SIZE,
        limit: PAGE_SIZE,
      },
      onCompleted: handleQueryCompleted,
      onError: showAlert,
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
    if (data?.users.pageInfo.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handleQueryCompleted(resultaData: ListUsersData) {
    setUsers(oldUsers =>
      resultaData ? [...oldUsers, ...resultaData.users.nodes] : oldUsers,
    );
  }

  function handlePressAddButton() {
    navigation.navigate('AddUser');
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Lista de usuários</Text>
      <View style={homeStyles.userListContainer}>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <UserItem name={item.name} email={item.email} />
          )}
          keyExtractor={item => String(item.id)}
          ListEmptyComponent={<Text>Sem usuários para listar</Text>}
          onEndReached={handleEndReached}
        />
        {loading ? <LoadingIndicator /> : null}
      </View>
      <FloatingActionButton
        onPress={handlePressAddButton}
        iconName="plus"
        iconColor="#fff"
      />
    </SafeAreaView>
  );
};
