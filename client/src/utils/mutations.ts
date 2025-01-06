// * `mutations.ts`:

//   * `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.

//   * `ADD_USER` will execute the `addUser` mutation.

//   * `SAVE_BOOK` will execute the `saveBook` mutation.

//   * `REMOVE_BOOK` will execute the `removeBook` mutation.

import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String!]
    $description: String!
    $title: String!
    $bookId: String!
    $image: String!
  ) {
    saveBook(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
      image: $image
    ) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
