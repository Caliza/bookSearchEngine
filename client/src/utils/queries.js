import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query getProfile {
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

