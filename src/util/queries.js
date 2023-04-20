import { gql } from '@apollo/client';

export const QUERY_CHARACTERS = gql`
query Characters {
  characters {
    id
    wiki_link
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

export const GET_CHARACTER_WIKI_LINK = gql `
query CharacterWikiLink($dokkanId: Int) {
  characterWikiLink(dokkanId: $dokkanId) {
    wiki_link
  }
}
`
;

export const GET_USERCHARACTERSBYID = gql`
query CharactersWithIds($dokkanIds: [Int]) {
  charactersWithIds(dokkanIds: $dokkanIds) {
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
}`;

export const GET_USERDATA = gql`
query FindOneUser($profileId: String!) {
  findOneUser(profileId: $profileId) {
    _id
    username
    savedCharacters
    role
    decks {
      _id
      name
      teams {
        _id
        name
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

export const GET_EVENT_DATA = gql `
query AllEventsStagesTeams {
  allEventsStagesTeams {
    _id
    name
    stages {
      _id
      eventId
      eventName
      name
      missions
      comments {
        _id
        creator {
          _id
          username
        }
        content
        userSavedCharacters
        replies {
          _id
          commentId
          content
          selectedCharacters
          createdAt
          creator {
            _id
            username
          }
        }
        createdAt
      }
      teams {
        _id
        creator {
          _id
          username
        }
        createdAt
        name
        mission
        teamArray
        leader
        subLeader
        rotation1
        rotation2
        floaters
        stageId
        character1 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character2 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character3 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character4 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character5 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character6 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character7 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        likes
        strategy
        items {
          _id
          id
          type
          description
        }
        supportMemory {
          _id
          id
          description
          name
        }
      }
    }
  }
}
`;

export const GET_ALL_EVENTS_WITH_STAGES = gql`
query FindAllEventsWithStages {
  findAllEventsWithStages {
    _id
    name
    stages {
      _id
      name
      missions
    }
  }
}
`;

export const GET_ALL_TEAMS_IN_STAGE = gql `
query FindOneStageTeams($stageId: String) {
  findOneStageTeams (stageId: $stageId) {
    _id
    name
    missions
      teams {
        _id
        creator {
          _id
          username
        }
        createdAt
        name
        mission
        teamArray
        leader
        subLeader
        rotation1
        rotation2
        floaters
        stageId
        character1 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character2 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character3 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character4 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character5 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character6 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        character7 {
          characterId
          leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
          EZA
          info
          sub {
            characterId
            leaderOrSubLeader
          hiddenPotential{
            hiddenPotential1
            hiddenPotential2
            hiddenPotential3
            hiddenPotential4
          }
            EZA
            info
          }
        }
        likes
        strategy
        items {
          _id
          id
          type
          description
        }
        supportMemory {
          _id
          id
          description
          name
        }
      }
  }
  }
`;

export const GET_ONE_STAGE_COMMENTS_REPLIES = gql`
query FindOneStageCommentsReplies($stageId: String) {
  findOneStageCommentsReplies(stageId: $stageId) {
    _id
    name
    comments {
      _id
      stage
      creator {
        _id
        username
      }
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
        selectedCharacters
        createdAt
      }
    }
  }
}
`;

export const GET_ONE_TEAM_POST = gql`
query FindOnePostTeam($teamId: String) {
  findOnePostTeam(teamId: $teamId) {
    _id
    likes
  }
}`;

export const GET_ITEMS_DATA = gql `
query Items {
  items {
    _id
    id
    name
    type
    description
  }
}
`;

export const GET_SUPPORT_MEMORY_DATA = gql `
query SupportMemory {
  supportMemory {
    _id
    id
    name
    description
  }
}
`;