import { Schema, type Document } from "mongoose"; // Import the Schema and Document types from Mongoose

export interface BookDocument extends Document {
  // Define the BookDocument interface
  bookId: string; // Define the bookId property as a string
  title?: string; // Define the title property as an optional string
  authors?: string[]; // Define the authors property as an array of strings
  description?: string; // Define the description property as a string
  image?: string; // Define the image property as a string
  link?: string; // Define the link property as a string
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema<BookDocument>({
  // Create a new schema for the BookDocument interface
  authors: [
    // Define the authors property as an array of strings
    {
      type: String, // Set the type of the authors property to a string
    },
  ],
  description: {
    // Define the description property as a string
    type: String, // Set the type of the description property to a string
    required: true, // Make the description property required
  },
  // saved book id from GoogleBooks
  bookId: {
    // Define the bookId property as a string
    type: String, // Set the type of the bookId property to a string
    required: true, // Make the bookId property required
  }, // End of bookId property
  image: {
    // Define the image property as a string
    type: String, // Set the type of the image property to a string
  }, // End of image property
  link: {
    // Define the link property as a string
    type: String, // Set the type of the link property to a string
  }, // End of link property
  title: {
    // Define the title property as a string
    type: String, // Set the type of the title property to a string
    required: true, // Make the title property required
  }, // End of title property
}); // End of bookSchema

export default bookSchema; // Export the bookSchema
