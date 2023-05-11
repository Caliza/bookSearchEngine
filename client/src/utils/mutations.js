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
  mutation saveBook($bookData: bookData!){
    saveBook(bookData: $bookData){
    _id
    savedBooks {
      title
      bookId
      authors
      description
      image
      link
    }
    }
  }
`

