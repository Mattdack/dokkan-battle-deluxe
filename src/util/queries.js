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
    thumb
    art
    type
    rarity
  }
}`;

export const GET_USERDATA = gql`
query FindOneUser($profileId: String!) {
  findOneUser(profileId: $profileId) {
    savedCharacters
  }
}`;
