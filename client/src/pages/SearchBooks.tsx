import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

function SearchBooks() {
  const [saveBook] = useMutation(SAVE_BOOK);
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);

  const handleSaveBook = async (book: any) => {
    try {
      const { data } = await saveBook({
        variables: { book },
      });
      setSavedBookIds([...savedBookIds, book.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Add your UI code for search results */}
      {/* Call handleSaveBook(book) when the user clicks save */}
    </div>
  );
}

export default SearchBooks;
