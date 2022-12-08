import { gql } from '@apollo/client';

export const QUERY_CHARACTERS = gql`
  query Characters {
    characters {
      id
      rarity
      type
    }
  }
`;

export const QUERY_LINKS = gql`
query CharactersLink($linkskill: String) {
    charactersLink(linkskill: $linkskill) {
      id
      link_skill
    }
  }
`;

export const QUERY_6LINKS = gql`
query Characters6Link($link1: String, $link2: String, $link3: String, $link4: String, $link5: String, $link6: String) {
  characters6Link(link1: $link1, link2: $link2, link3: $link3, link4: $link4, link5: $link5, link6: $link6) {
    id
    link_skill
  }
}`;

export const QUERY_7LINKS = gql`
query Characters7Link($link1: String, $link2: String, $link3: String, $link4: String, $link5: String, $link6: String, $link7: String) {
  characters7Link(link1: $link1, link2: $link2, link3: $link3, link4: $link4, link5: $link5, link6: $link6, link7: $link7) {
    id
    link_skill
  }
}`;