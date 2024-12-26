// I commented this entire file because I've created the typeDefs.ts and resolvers.ts so this file shouldn't be necessary anymore.

// import type { Request, Response } from 'express'; // import types

// import User from '../models/User.js'; // import user model

// import { signToken } from '../services/auth.js'; // import signToken function

// // get a single user by either their id or their username
// export const getSingleUser = async (req: Request, res: Response) => { // export function
//   const foundUser = await User.findOne({ // find a user
//     $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }], // by id or username
//   });

//   if (!foundUser) { // if no user is found
//     return res.status(400).json({ message: 'Cannot find a user with this id!' }); // return an error
//   }

//   return res.json(foundUser); // return the user
// };

// // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
// export const createUser = async (req: Request, res: Response) => { // export function
//   const user = await User.create(req.body); // create a user

//   if (!user) { // if no user is created
//     return res.status(400).json({ message: 'Something is wrong!' }); // return an error
//   }
//   const token = signToken(user.username, user.password, user._id); // sign a token
//   return res.json({ token, user }); // return the token and user
// };

// // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// // {body} is destructured req.body
// export const login = async (req: Request, res: Response) => { // export function
//   const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }); // find a user
//   if (!user) { // if no user is found
//     return res.status(400).json({ message: "Can't find this user" }); // return an error
//   }

//   const correctPw = await user.isCorrectPassword(req.body.password); // check password

//   if (!correctPw) { // if password is incorrect
//     return res.status(400).json({ message: 'Wrong password!' }); // return an error
//   }
//   const token = signToken(user.username, user.password, user._id); // sign a token
//   return res.json({ token, user }); // return the token and user
// };

// // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// // user comes from `req.user` created in the auth middleware function
// export const saveBook = async (req: Request, res: Response) => { // export function
//   try {
//     const updatedUser = await User.findOneAndUpdate( // find a user and update
//       { _id: req.user._id }, // by id
//       { $addToSet: { savedBooks: req.body } }, // add a book to savedBooks
//       { new: true, runValidators: true } // return updated user
//     );
//     return res.json(updatedUser); // return updated user
//   } catch (err) { // catch errors
//     console.log(err);  // log errors
//     return res.status(400).json(err); // return an error
//   }
// };

// // remove a book from `savedBooks`
// export const deleteBook = async (req: Request, res: Response) => {
//   const updatedUser = await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $pull: { savedBooks: { bookId: req.params.bookId } } },
//     { new: true }
//   );
//   if (!updatedUser) {
//     return res.status(404).json({ message: "Couldn't find user with this id!" });
//   }
//   return res.json(updatedUser);
// };
