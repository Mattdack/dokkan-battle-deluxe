import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

export const LOGIN_USER = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}
`;

export const UPDATE_SAVED_CHARACTERS = gql`
mutation Mutation($profileId: String!, $newSavedCharacters: [Int]) {
  updateSavedCharacters(profileId: $profileId, newSavedCharacters: $newSavedCharacters) {
    savedCharacters
  }
}`;

export const ADD_CHARACTER = gql`
mutation SaveCharacter($token: String!, $dokkanId: Int) {
  saveCharacter(token: $token, dokkanId: $dokkanId) {
    savedCharacters
  }
}`;

export const REMOVE_CHARACTER = gql`
mutation RemoveCharacter($token: String!, $dokkanId: Int) {
  removeCharacter(token: $token, dokkanId: $dokkanId) {
    savedCharacters
  }
}`;