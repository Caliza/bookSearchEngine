const {gql} = require('apollo-server-express')

const typeDefs = gql`
type User{
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
}

type Book{
    bookId: ID
    image: String
    link: String
    title: String
    authors: [String]
    description: String
}

input BookInput{
    bookId: ID
    image: String
    link: String
    title: String
    authors: [String]
    description: String 
}

type Auth{
    token: ID
    user: User
}

type Query{
    me: User
}

type Mutation{
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
}

`
module.exports = typeDefs