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

export const RENAME_DECK = gql`
mutation RenameDeck($profileId: String, $deckId: String, $newDeckName: String) {
  renameDeck(profileId: $profileId, deckId: $deckId, newDeckName: $newDeckName) {
    decks {
      _id
      name
    }
  }
}
`

export const ADD_TEAM_TO_DECK = gql`
mutation AddTeamToDeck($profileId: String!, $deckId: String, $team: PersonalTeamInput) {
  addTeamToDeck(profileId: $profileId, deckId: $deckId, team: $team) {
    _id
    decks {
      _id
      name
      teams {
        _id
        name
        info {
          leader
          subLeader
          rotation1
          rotation2
          notes
        }
      }
    }
  }
}`;

export const EDIT_TEAM_INFO = gql`
mutation EditTeamInfo($profileId: String!, $deckId: String, $teamId: String, $info: InfoInput, $newTeamName: String) {
  editTeamInfo(profileId: $profileId, deckId: $deckId, teamId: $teamId, info: $info, newTeamName: $newTeamName) {
    decks {
      _id
      teams {
        _id
        name
        info {
          leader
          subLeader
          rotation1
          rotation2
          notes
        }
      }
    }
  }
}
`;

export const REMOVE_TEAM_FROM_DECK = gql `
mutation RemoveTeamFromDeck($profileId: String!, $deckId: String, $teamId: String) {
  removeTeamFromDeck(profileId: $profileId, deckId: $deckId, teamId: $teamId) {
    _id
    decks {
      _id
      name
      teams {
        _id
        name
      }
    }
  }
}`;

export const ADD_TEAM_POST_TO_STAGE = gql `
mutation AddTeamPostToStage($userId: String, $stageId: String, $teamInfo: TeamPostInput) {
  addTeamPostToStage(userId: $userId, stageId: $stageId, teamInfo: $teamInfo) {
    _id
    name
    teamArray
  }
}
`;

export const REMOVE_TEAM_POST_FROM_STAGE = gql `
mutation RemoveTeamPostFromStage($userId: String, $teamPostId: String, $stageId: String) {
  removeTeamPostFromStage(userId: $userId, teamPostId: $teamPostId, stageId: $stageId) {
    _id
  }
}`

export const LIKE_TEAM_POST = gql`
mutation LikeTeamPost($userId: String, $teamPostId: String) {
  likeTeamPost(userId: $userId, teamPostId: $teamPostId) {
    _id
    name
    likes
  }
}
`

export const REMOVE_LIKE_FROM_TEAM_POST = gql`
mutation RemoveLikeFromTeamPost($userId: String, $teamPostId: String) {
  removeLikeFromTeamPost(userId: $userId, teamPostId: $teamPostId) {
    _id
    likes
  }
}
`