import {gql} from '@apollo/client';

export interface GetUserVariables {
  userId: number;
}

export interface GetUserResponse {
  user: {
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin';
    password: string;
    birthDate: string;
  };
}

export const FETCH_USER_QUERY = gql`
  query GetUser($userId: ID) {
    user(id: $userId) {
      name
      email
      birthDate
      id
      phone
      role
    }
  }
`;
