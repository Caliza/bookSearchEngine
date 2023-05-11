import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation  addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
  }
  
`;

export const LOGIN_USER = gql`
  mutation  login($email: String!, $password: String!){
    login(email: $email, password: $password){
       token
       user {
        username
        _id
       }
    }
  } 
  
  
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