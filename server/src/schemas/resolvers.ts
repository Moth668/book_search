import User from "../models/User.js"; // Import user model
import { signToken } from "../services/auth.js"; // Import token service

const resolvers = {
  // Create the resolver object
  Query: {
    // Create the query object
    // Get the logged-in user's information
    me: async (_: any, __: any, context: any) => {
      // Create the me query
      if (!context.user) {
        // If there is no user context
        throw new Error("Not authenticated"); // Throw an authentication error
      }
      const user = await User.findById(context.user._id).populate("savedBooks"); // Find the user by id and populate the savedBooks field
      if (!user) {
        throw new Error("User not found");
      }

      return {
        ...user.toObject(),
        bookCount: user.savedBooks.length,
      };
    },
  },

  Mutation: {
    // Create the mutation object
    // Create a new user
    addUser: async (_: any, { username, email, password }: any) => {
      // Create the createUser mutation
      const user = await User.create({ username, email, password }); // Create a new user
      const token = signToken(user.username, user.password, user._id); // Sign a token
      return { token, user }; // Return the token and user
    },

    // Login an existing user
    login: async (_: any, { email, password }: any) => {
      // Create the login mutation
      const user = await User.findOne({ email }); // Find the user by email
      if (!user) {
        // If the user is not found
        throw new Error("Can't find this user"); // Throw an authentication error
      }

      const correctPw = await user.isCorrectPassword(password); // Check if the password is correct
      if (!correctPw) {
        // If the password is incorrect
        throw new Error("Wrong password!"); // Throw an authentication error
      }

      const token = signToken(user.username, user.password, user._id); // Sign a token
      return { token, user }; // Return the token and user
    },

    // Save a book to the user's savedBooks field
    saveBook: async (_: any, { book }: any, context: any) => {
      // Create the saveBook mutation
      if (!context.user) {
        // If there is no user context
        throw new Error("Not authenticated"); // Throw an authentication error
      }

      const updatedUser = await User.findByIdAndUpdate(
        // Find a user and update
        context.user._id, // By id
        { $addToSet: { savedBooks: book } }, // Add a book to savedBooks
        { new: true, runValidators: true } // Return the updated user
      );

      return updatedUser; // Return the updated user
    },

    // Remove a book from the user's savedBooks field
    removeBook: async (_: any, { bookId }: any, context: any) => {
      // Create the deleteBook mutation
      if (!context.user) {
        // If there is no user context
        throw new Error("Not authenticated");
      }

      const updatedUser = await User.findByIdAndUpdate(
        // Find a user and update
        context.user._id, // By id
        { $pull: { savedBooks: { bookId } } }, // Remove a book from savedBooks
        { new: true } // Return the updated user
      );

      if (!updatedUser) {
        // If the user is not found
        throw new Error("Couldn't find user with this id!"); // Throw an error
      }

      return updatedUser; // Return the updated user
    },
  },
};

export default resolvers; // Export the resolvers object
