import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

export const EDIT_CHARACTER = gql `
mutation EditCharacter($updatedCharacter: CharacterInput) {
  editCharacter(updatedCharacter: $updatedCharacter) {
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
`;

export const ADD_CHARACTER = gql`
mutation AddCharacter($character: CharacterInput) {
  addCharacter(character: $character) {
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
`;

export const ADD_EZA_TO_CHARACTER = gql`
mutation AddEZAToCharacter($updatedCharacter: CharacterInput) {
  addEZAToCharacter(updatedCharacter: $updatedCharacter) {
    id
    active_skill_condition_eza
    jp_date_eza
    ls_description_eza
    ps_description_eza
    sa_description_eza
    transform_condition_eza
    ultra_sa_description_eza
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
}
`

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

export const ADD_COMMENT_TO_STAGE = gql `
mutation AddCommentToStage($userId: String, $stageId: String, $comment: String, $userSavedCharacters: [Int]) {
  addCommentToStage(userId: $userId, stageId: $stageId, comment: $comment, userSavedCharacters: $userSavedCharacters) {
    _id
    name
    comments {
      _id
      stage
      content
      userSavedCharacters
      createdAt
      replies {
        _id
        commentId
        creator {
          _id
          username
        }
        content
        createdAt
      }
      creator {
        _id
        username
      }
    }
  }
}
`

export const REMOVE_COMMENT_FROM_STAGE = gql `
mutation removeCommentFromStage($userId: String, $stageId: String, $commentId: String) {
  removeCommentFromStage(userId: $userId, stageId: $stageId, commentId: $commentId) {
    _id
    name
    comments {
      _id
      stage
      content
      userSavedCharacters
      createdAt
      creator {
        _id
        username
      }
      replies {
        _id
        commentId
        content
        createdAt
        creator {
          _id
          username
        }
      }
    }
  }
}
`;

export const ADD_REPLY_TO_COMMENT = gql `
mutation AddReplyToComment($userId: String, $commentId: String, $reply: String, $selectedCharacters: [Int]) {
  addReplyToComment(userId: $userId, commentId: $commentId, reply: $reply, selectedCharacters: $selectedCharacters) {
    _id
    content
    replies {
      _id
      commentId
      creator {
        _id
        username
      }
      content
      createdAt
    }
  }
}
`;

export const REMOVE_REPLY_FROM_COMMENT = gql `
mutation RemoveReplyFromComment($userId: String, $commentId: String, $replyId: String) {
  removeReplyFromComment(userId: $userId, commentId: $commentId, replyId: $replyId) {
    _id
    stage
    replies {
      _id
      commentId
      content
      createdAt
      creator {
        _id
        username
      }
    }
  }
}
`;