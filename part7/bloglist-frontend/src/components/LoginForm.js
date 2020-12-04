import React, { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setError } from "../reducers/notificationReducer";

const LoginForm = ({ handleLogin, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await handleLogin({ username, password });

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
    } catch (e) {
      dispatch(setError("wrong username or password"));
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
        <button id="signin-button" type="submit">
          Sign in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
