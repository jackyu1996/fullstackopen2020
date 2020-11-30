import PropTypes from 'prop-types';
import React, { useState } from 'react';
import blogService from '../services/blogs';

const LoginForm = ({ handleLogin, setUser, setMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await handleLogin({ username, password });

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
    } catch (e) {
      setMessage({ type: 'error', content: 'wrong username or password' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          username:
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          password:
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <button
          id="signin-button"
          type="submit">Sign in</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default LoginForm;
