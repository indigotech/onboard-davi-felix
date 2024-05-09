import {NewUser} from '@src/screens/add-user/validation';

import {gql} from '@apollo/client';

export interface AddUserResponse {
  createUser: {
    id: number;
    name: string;
  };
}
export interface AddUserVariables {
  data: NewUser;
}

export const ADD_USER_MUTATION = gql`
  mutation CreateNewUser($data: UserInput!) {
    createUser(data: $data) {
      id
      name
    }
  }
`;
