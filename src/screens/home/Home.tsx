import * as React from 'react';

import {Text, Alert, FlatList, View} from 'react-native';

import {GlobalContainer, Title} from '@src/globalStyles';
import {UserItem} from './components/UserItem';
import {homeStyles} from './styles';
import {LoadingIndicator} from '@src/components/loading-indicator/LoadingIndicator';
import {FloatingActionButton} from '@src/components/floating-action-button/FloatingActionButton';

import {ScreenProps} from '../Routes';

import {useQuery} from '@apollo/client';

import {
  ListUsersData,
  PageData,
  GET_USERS_QUERY,
  User,
} from '@src/graphql/listUsers';
import {useFocusEffect} from '@react-navigation/native';

const PAGE_SIZE = 10;

export const Home = ({navigation, route}: ScreenProps<'Home'>) => {
  const updateUsers = route.params?.updateUsers;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [users, setUsers] = React.useState<User[]>([]);
  const [refreshing, setRefresing] = React.useState(false);
  const {data, loading, refetch} = useQuery<ListUsersData, PageData>(
    GET_USERS_QUERY,
    {
      variables: {
        offset: currentPage * PAGE_SIZE,
        limit: PAGE_SIZE,
      },
      onError: showAlert,
      onCompleted: handleQueryCompleted,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
    },
  );

  const handleRefetchQuery = React.useCallback(() => {
    setUsers([]);
    setCurrentPage(0);
  }, [setUsers, setCurrentPage]);

  useFocusEffect(
    React.useCallback(() => {
      if (updateUsers) {
        handleRefetchQuery();
      }
      // Ensures that users will no update on gesture goBack
      navigation.setParams({updateUsers: false});
    }, [handleRefetchQuery, updateUsers, navigation]),
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

  function handleQueryCompleted(reponseData: ListUsersData) {
    if (reponseData) {
      const newUsers = reponseData.users.nodes;
      setUsers(oldUsers => [...oldUsers, ...newUsers]);
    }
  }

  function handleEndReached() {
    if (data?.users.pageInfo.hasNextPage) {
      setCurrentPage(currPage => currPage + 1);
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

  async function handleRefresh() {
    setRefresing(true);
    handleRefetchQuery();
    setRefresing(false);
  }

  return (
    <GlobalContainer>
      <Title>Lista de usuários</Title>
      <View style={homeStyles.userListContainer}>
        <FlatList
          data={users}
          onEndReachedThreshold={2}
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
          refreshing={refreshing}
          onRefresh={handleRefresh}
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
