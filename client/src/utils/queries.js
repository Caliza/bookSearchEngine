import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    me {
        _id
        bookCount
        email
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
        username
    }
  }
`;