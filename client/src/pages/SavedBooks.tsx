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
      {userData.savedBooks && userData.savedBooks.length > 0 ? (
        userData.savedBooks.map((book: any) => (
          <div key={book.bookId}>
            <p>{book.title}</p>
            <button onClick={() => handleDeleteBook(book.bookId)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No saved books.</p>
      )}
    </div>
  );
}

export default SavedBooks;
