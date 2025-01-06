// * `LoginForm.tsx`: Replace the `loginUser()` functionality imported from the `API` file with the `LOGIN_USER` mutation functionality.

import { useState } from "react"; // Import React and useState hook
import { useMutation } from "@apollo/client"; // Import useMutation hook from Apollo Client
import { LOGIN_USER } from "../utils/mutations"; // Import LOGIN_USER mutation
// import type { ChangeEvent, FormEvent } from 'react';
import AuthServices from "../utils/auth.ts"; // Import AuthServices from auth.ts

function LoginForm() {
  // Define LoginForm component
  const [loginUser] = useMutation(LOGIN_USER); // Destructure the loginUser mutation function from the useMutation hook
  const [formState, setFormState] = useState({ email: "", password: "" }); // Define formState and setFormState with useState

  const handleFormSubmit = async (event: React.FormEvent) => {
    // Define handleFormSubmit function
    event.preventDefault(); // Prevent default form behavior
    try {
      // Try to execute the following code block
      const { data } = await loginUser({
        // Destructure the data object from the loginUser mutation
        variables: { ...formState }, // Pass the formState object as variables to the loginUser mutation
      }); // Call the loginUser mutation
      console.log(data); // Log the data object to the console
      AuthServices.login(data.login.token); // Call the login method from the AuthServices class with the token from the data object
    } catch (err) {
      // Catch any errors and execute the following code block
      console.error(err); // Log the error to the console
    } // End of try...catch block
  }; // End of handleFormSubmit function

  return (
    // Return the following JSX
    <form onSubmit={handleFormSubmit}>
      {" "}
      {/* Render a form with an onSubmit event handler */}
      <input
        name="email"
        placeholder="Email"
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />{" "}
      {/* Render an input field for the email with an onChange event handler */}
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />{" "}
      {/* Render an input field for the password with an onChange event handler */}
      <button type="submit">Log In</button> {/* Render a submit button */}
    </form> // End of form
  ); // End of return statement
} // End of LoginForm component

export default LoginForm; // Export LoginForm component
