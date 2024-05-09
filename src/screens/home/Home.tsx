import * as React from 'react';

import {Text, Alert, FlatList, View} from 'react-native';

import {GlobalContainer, Title} from '@src/globalStyles';
import {UserItem} from './components/UserItem';
import {homeStyles} from './styles';
import {LoadingIndicator} from '@src/components/loading-indicator/LoadingIndicator';
import {FloatingActionButton} from '@src/components/floating-action-button/FloatingActionButton';

import {ScreenProps} from '../Routes';

import {useQuery} from '@apollo/client';

import {ListUsersData, PageData, GET_USERS_QUERY} from '@src/graphql/listUsers';

const PAGE_SIZE = 10;

export const Home = ({navigation}: ScreenProps<'Home'>) => {
  const [limit, setLimit] = React.useState(PAGE_SIZE);
  const {data, loading, refetch, fetchMore} = useQuery<ListUsersData, PageData>(
    GET_USERS_QUERY,
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

  function handleUserPress(userId: number) {
    navigation.navigate('UserDetail', {
      userId,
    });
  }

  return (
    <GlobalContainer>
      <Title>Lista de usuários</Title>
      <View style={homeStyles.userListContainer}>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <UserItem
              name={item.name}
              email={item.email}
              onPress={() => handleUserPress(item.id)}
            />
          )}
          keyExtractor={item => String(item.id)}
          ListEmptyComponent={
            loading ? null : <Text>Sem usuários para listar</Text>
          }
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
    </GlobalContainer>
  );
};
