import { gql } from '@apollo/client';

export const QUERY_CHARACTERS = gql`
query Characters {
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

export const QUERY_7LINKS = gql`
query Characters7Link($link1: String, $link2: String, $link3: String, $link4: String, $link5: String, $link6: String, $link7: String) {
  characters7Link(link1: $link1, link2: $link2, link3: $link3, link4: $link4, link5: $link5, link6: $link6, link7: $link7) {
    id
    name
    link_skill
    category
    thumb
    art
    type
    rarity
    glb_date
  }
}`;

export const GET_USERDATA = gql`
query FindOneUser($profileId: String!) {
  findOneUser(profileId: $profileId) {
    _id
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
    savedCharacters
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
      teams {
        _id
        creator {
          _id
          username
        }
        createdAt
        name
        teamArray
        leader
        subLeader
        rotation1
        rotation2
        floaters
        stageId
        character1 {
          characterId
          role
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
            role
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
          role
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
            role
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
          role
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
            role
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
          role
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
            role
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
          role
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
            role
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
          role
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
            role
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
          role
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
            role
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
        comments {
          createdAt
          content
          creator
        }
      }
    }
  }
}`;

export const GET_ONE_TEAM_POST = gql`
query FindOnePostTeam($teamId: String) {
  findOnePostTeam(teamId: $teamId) {
    _id
    likes
    comments {
      _id
      createdAt
      creator
      content
      teamPost
    }
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