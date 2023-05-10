import { gql } from '@apollo/client';

export const ADD_THOUGHT = gql`
  mutation  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(bookData: BookInput!): User
  removeBook(bookId: ID!): User
`;

// addThought($thoughtText: String!, $thoughtAuthor: String!) {
//     addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//       }
//     }
//   }