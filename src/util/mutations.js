import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      savedCharacters
    }
  }
}
`;

export const ADD_CHARACTER = gql`
mutation SaveCharacter($username: String!, $dokkanId: Int) {
  saveCharacter(username: $username, dokkanId: $dokkanId) {
    username
    email
    savedCharacters
  }
}`;

export const REMOVE_CHARACTER = gql`
mutation RemoveCharacter($username: String!, $dokkanId: Int) {
  removeCharacter(username: $username, dokkanId: $dokkanId) {
    username
    email
    savedCharacters
  }
}`;