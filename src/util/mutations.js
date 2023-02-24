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
mutation Mutation($profileId: String!, $deckId: String, $team: [CharacterInput]) {
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
        characters {
          id
          thumb
          art
          name
          title
          rarity
          type
          cost
          ls_description
          ls_description_eza
          sa_type
          sa_name
          sa_description
          sa_description_eza
          ultra_sa_type
          ultra_sa_name
          ultra_sa_description
          ultra_sa_description_eza
          ps_name
          ps_description
          ps_description_eza
          sa_type_active
          active_skill_name
          active_skill
          active_skill_condition
          active_skill_condition_eza
          transform_type
          transform_condition
          transform_condition_eza
          link_skill
          category
          jp_date
          glb_date
          jp_date_eza
          glb_date_eza
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