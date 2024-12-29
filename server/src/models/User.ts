import { Schema, model, type Document } from 'mongoose'; // Import the Schema, model, and Document types from Mongoose
import bcrypt from 'bcrypt'; // Import bcrypt

// import schema from Book.js
import bookSchema from './Book.js'; // Import the bookSchema
import type { BookDocument } from './Book.js'; // Import the BookDocument interface

export interface UserDocument extends Document { // Define the UserDocument interface
  id: string; // Define the id property as a string
  username: string; // Define the username property as a string
  email: string; // Define the email property as a string
  password: string; // Define the password property as a string
  savedBooks: BookDocument[]; // Define the savedBooks property as an array of BookDocuments
  isCorrectPassword(password: string): Promise<boolean>; // Define the isCorrectPassword method
  bookCount: number;  // Define the bookCount property as a number
}

const userSchema = new Schema<UserDocument>( // Create a new schema for the UserDocument interface
  { // Define the following properties
    username: { // Define the username property
      type: String, // Set the type of the username property to a string
      required: true, // Make the username property required
      unique: true, // Make the username property unique
    }, // End of username property
    email: { // Define the email property
      type: String, // Set the type of the email property to a string
      required: true, // Make the email property required
      unique: true, // Make the email property unique
      match: [/.+@.+\..+/, 'Must use a valid email address'], // Validate the email property
    }, // End of email property
    password: { // Define the password property
      type: String, // Set the type of the password property to a string
      required: true, // Make the password property required
    }, // End of password property
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema],
  }, 
  // set this to use virtual below
  {
    toJSON: { // Define the toJSON property
      virtuals: true, // Set the virtuals property to true
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) { // Define a pre-save hook
  if (this.isNew || this.isModified('password')) { // Check if the password is new or modified
    const saltRounds = 10; // Define the number of salt rounds
    this.password = await bcrypt.hash(this.password, saltRounds); // Hash the password
  } // End of if statement

  next(); // Call the next middleware
}); // End of pre-save hook

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) { // Define the isCorrectPassword method
  return await bcrypt.compare(password, this.password); // Compare the password
}; // End of isCorrectPassword method

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('bookCount').get(function () { // Define a virtual property
  return this.savedBooks.length; // Return the number of saved books
}); // End of virtual property

const User = model<UserDocument>('User', userSchema); // Create a User model    

export default User; // Export the User model
