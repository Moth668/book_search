import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

function LoginForm() {
  const [loginUser] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input name="email" placeholder="Email" onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
      <input name="password" placeholder="Password" type="password" onChange={(e) => setFormState({ ...formState, password: e.target.value })} />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
