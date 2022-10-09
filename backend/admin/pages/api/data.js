import { gql } from '@apollo/client';

export const GET_TOKEN = gql`
  mutation SignIn($username: String, $password: String) {
    signIn(username: $username, password: $password)
  }
`;
