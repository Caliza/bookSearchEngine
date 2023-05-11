import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation  addUser($username: String!, $email: String!, $password: String!){
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

export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookInput!) {
  saveBook(bookData: $bookData) {
    _id
    savedBooks {
      authors
      bookId
      description
      link
      image
      title
    }
    bookCount
    email
    username
  }
}
`
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
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
`
