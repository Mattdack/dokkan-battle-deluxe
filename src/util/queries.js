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
