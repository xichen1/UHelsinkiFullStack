import { gql } from '@apollo/client'

export const ALL_AUTHOR = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
  }
}
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(title: $title, published: $published, author: $author, genres: $genres){
    title
    author
  }
}
`

export const EDIT_BIRTH = gql`
mutation editBirth($name: String!, $born: Int!){
  editAuthor(name: $name, born: $born){
    name
    born
  }
}
`