import * as React from 'react';

import {SafeAreaView, Text, Alert, FlatList, View} from 'react-native';

import {globalStyles} from '@src/globalStyles';
import {UserItem} from './components/UserItem';
import {homeStyles} from './styles';
import {LoadingIndicator} from '@src/components/loading-indicator/LoadingIndicator';
import {FloatingActionButton} from '@src/components/floating-action-button/FloatingActionButton';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Routes';

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

type HomeScreenProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

const PAGE_SIZE = 10;

export const Home = ({navigation}: HomeScreenProps) => {
  const [limit, setLimit] = React.useState(PAGE_SIZE);
  const {data, loading, refetch, fetchMore} = useQuery<ListUsersData, PageData>(
    GET_USERS,
    {
      variables: {
        offset: 0,
        limit,
      },
      onError: showAlert,
      notifyOnNetworkStatusChange: true,
    },
  );

  const users = data?.users.nodes ?? [];

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
          offset: users.length,
          limit: PAGE_SIZE,
        },
      }).then(result => {
        setLimit(users.length + result.data.users.nodes.length);
      });
    }
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
          refreshing={loading}
          onRefresh={() => refetch({offset: 0, limit: PAGE_SIZE})}
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
