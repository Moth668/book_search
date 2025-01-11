// * `SavedBooks.tsx`:

//   * Remove the `useEffect()` hook that sets the state for `UserData`.

//   * Instead, use the `useQuery()` hook to execute the `GET_ME` query on load and save it to a variable named `userData`.

//   * Use the `useMutation()` hook to execute the `REMOVE_BOOK` mutation in the `handleDeleteBook()` function instead of the `deleteBook()` function that's imported from the `API` file. (Make sure you keep the `removeBookId()` function in place!)
// import { useState, useEffect } from 'react';
// import { Container, Card, Button, Row, Col } from 'react-bootstrap';
//  -------------------------------------------------------------------------


// import { useQuery, useMutation } from '@apollo/client';
// import { GET_ME } from '../utils/queries';
// import { REMOVE_BOOK } from '../utils/mutations';

// function SavedBooks() {
//   const { data, loading, error } = useQuery(GET_ME);
//   const [removeBook] = useMutation(REMOVE_BOOK);

//   const handleDeleteBook = async (bookId: string) => {
//     try {
//       await removeBook({ variables: { bookId } });
//       // Optionally update the UI or re-fetch GET_ME
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading saved books.</p>;

//   const userData = data?.me || {};

//   return (
//     <div>
//       {userData.savedBooks && userData.savedBooks.length > 0 ? (
//         userData.savedBooks.map((book: any) => (
//           <div key={book.bookId}>
//             <p>{book.title}</p>
//             <button onClick={() => handleDeleteBook(book.bookId)}>Delete</button>
//           </div>
//         ))
//       ) : (
//         <p>No saved books.</p>
//       )}
//     </div>
//   );
// }

// export default SavedBooks;

import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { getMe, deleteBook } from "../utils/API";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import type { User } from "../models/User";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {
 const { data, loading } = useQuery(GET_ME);
 const [removeBook] = useMutation(REMOVE_BOOK);
 const userData: User = data?.me || {};
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     await removeBook({variables: {bookId}});

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

