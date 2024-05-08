import * as React from 'react';

import {SafeAreaView, ScrollView, Text} from 'react-native';

import {globalStyles} from '@src/globalStyles';
import {UserItem} from './components/UserItem';
import {homeStyles} from './styles';

const dummyUsers = [
  {id: 1, name: 'Davi Felix', email: 'davi.felix@taqtile.com.br'},
  {id: 2, name: 'Alan Raso', email: 'alan.raso@taqtile.com.br'},
  {id: 3, name: 'Erick Sousa', email: 'erick.sousa@taqtile.com.br'},
  {id: 4, name: 'Bruno Brandão', email: 'bruno.brandrao@taqtile.com.br'},
  {id: 5, name: 'Daniel Ueno', email: 'daniel.ueno@taqtile.com.br'},
  {id: 6, name: 'Eduardo Grimori', email: 'eduardo.grimori@taqtile.com.br'},
  {id: 7, name: 'John Smith', email: 'john.smith@taqtile.com.br'},
  {id: 8, name: 'Emily Johnson', email: 'emily.johnson@taqtile.com.br'},
  {id: 9, name: 'Michael Williams', email: 'michael.williams@taqtile.com.br'},
  {id: 10, name: 'Emma Brown', email: 'emma.brown@taqtile.com.br'},
  {id: 11, name: 'Daniel Jones', email: 'daniel.jones@taqtile.com.br'},
  {id: 12, name: 'Sophia Garcia', email: 'sophia.garcia@taqtile.com.br'},
  {id: 13, name: 'Matthew Davis', email: 'matthew.davis@taqtile.com.br'},
  {id: 14, name: 'Olivia Rodriguez', email: 'olivia.rodriguez@taqtile.com.br'},
  {
    id: 15,
    name: 'Alexander Martinez',
    email: 'alexander.martinez@taqtile.com.br',
  },
  {
    id: 16,
    name: 'Isabella Hernandez',
    email: 'isabella.hernandez@taqtile.com.br',
  },
  {id: 17, name: 'Ethan Lopez', email: 'ethan.lopez@taqtile.com.br'},
  {id: 18, name: 'Mia Gonzalez', email: 'mia.gonzalez@taqtile.com.br'},
  {id: 19, name: 'David Wilson', email: 'david.wilson@taqtile.com.br'},
  {id: 20, name: 'Ava Perez', email: 'ava.perez@taqtile.com.br'},
  {id: 21, name: 'James Moore', email: 'james.moore@taqtile.com.br'},
  {id: 22, name: 'Charlotte Taylor', email: 'charlotte.taylor@taqtile.com.br'},
  {
    id: 23,
    name: 'Benjamin Anderson',
    email: 'benjamin.anderson@taqtile.com.br',
  },
  {id: 24, name: 'Amelia Thomas', email: 'amelia.thomas@taqtile.com.br'},
  {id: 25, name: 'Daniel Jackson', email: 'daniel.jackson@taqtile.com.br'},
  {id: 26, name: 'Elizabeth White', email: 'elizabeth.white@taqtile.com.br'},
];

export const Home = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Lista de usuários</Text>
      <ScrollView style={homeStyles.userListContainer}>
        {dummyUsers.map(user => (
          <UserItem name={user.name} email={user.email} key={user.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
