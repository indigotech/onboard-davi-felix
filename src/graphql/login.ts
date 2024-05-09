import {gql} from '@apollo/client';

export interface LoginResponse {
  login: {
    token: string;
  };
}

export interface LoginVariables {
  input: {
    email: string;
    password: string;
  };
}

export const LOGIN_USER_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(data: $input) {
      token
    }
  }
`;
