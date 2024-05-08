import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('ONBOARDING-APP:accessToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            keyArgs: false,
            merge(existing, incoming, {args}) {
              const {offset} = args?.data;
              const merged = existing ? existing?.nodes.slice(0) : [];
              for (let i = 0; i < incoming.nodes.length; ++i) {
                merged[offset + i] = incoming.nodes[i];
              }
              return {
                __typename: incoming.__typename,
                nodes: merged,
                pageInfo: incoming.pageInfo,
              };
            },
            read(existing, {args}) {
              const {offset, limit} = args?.data;
              if (existing) {
                const users = existing.nodes;
                return {
                  nodes: users.slice(offset, offset + limit),
                  pageInfo: existing.pageInfo,
                };
              }
              return existing;
            },
          },
        },
      },
    },
  }),
});
