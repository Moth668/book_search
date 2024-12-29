import React, { useState } from "react"; // Import React and useState hook
import { useMutation } from "@apollo/client"; // Import useMutation hook from Apollo Client
import { ADD_USER } from "../utils/mutations"; // Import ADD_USER mutation

function SignupForm() {
  // Define SignupForm component
  const [addUser] = useMutation(ADD_USER); // Destructure the addUser mutation function from the useMutation hook
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  }); // Define formState and setFormState with useState

  const handleFormSubmit = async (event: React.FormEvent) => {
    // Define handleFormSubmit function
    event.preventDefault(); // Prevent default form behavior
    try {
      // Try to execute the following code block
      const { data } = await addUser({
        // Destructure the data object from the addUser mutation
        variables: { ...formState }, // Pass the formState object as variables to the addUser mutation
      }); // Call the addUser mutation
      console.log(data); // Log the data object to the console
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
        name="username"
        placeholder="Username"
        onChange={(e) =>
          setFormState({ ...formState, username: e.target.value })
        }
      />{" "}
      {/* Render an input field for the username with an onChange event handler */}
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
      <button type="submit">Sign Up</button> {/* Render a submit button */}
    </form> // End of form
  ); // End of return statement
} // End of SignupForm component

export default SignupForm; // Export SignupForm component
