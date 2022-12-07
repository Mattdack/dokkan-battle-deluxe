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