// * `SavedBooks.tsx`:

//   * Remove the `useEffect()` hook that sets the state for `UserData`.

//   * Instead, use the `useQuery()` hook to execute the `GET_ME` query on load and save it to a variable named `userData`.

//   * Use the `useMutation()` hook to execute the `REMOVE_BOOK` mutation in the `handleDeleteBook()` function instead of the `deleteBook()` function that's imported from the `API` file. (Make sure you keep the `removeBookId()` function in place!)

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

function SavedBooks() {
  const { data, loading, error } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId: string) => {
    try {
      await removeBook({ variables: { bookId } });
      // Optionally update the UI or re-fetch GET_ME
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading saved books.</p>;

  const userData = data?.me || {};

  return (
    <div>
      {userData.savedBooks.map((book: any) => (
        <div key={book.bookId}>
          <p>{book.title}</p>
          <button onClick={() => handleDeleteBook(book.bookId)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default SavedBooks;
