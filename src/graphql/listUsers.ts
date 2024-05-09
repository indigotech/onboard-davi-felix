import {gql} from '@apollo/client';

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

export interface ListUsersData {
  users: {
    nodes: User[];
    pageInfo: PageInfo;
  };
}

export interface PageData {
  offset: number;
  limit: number;
}

export const GET_USERS_QUERY = gql`
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
