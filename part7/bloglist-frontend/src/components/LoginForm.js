import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import { useField } from "../hooks";

const LoginForm = () => {
  const dispatch = useDispatch();

  const { reset: resetUsername, ...usernameInput } = useField("username");
  const { reset: resetPassword, ...passwordInput } = useField("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      login({
        username: usernameInput.value,
        password: passwordInput.value,
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          username:
          <input type="text" name="Username" {...usernameInput} />
        </p>
        <p>
          password:
          <input type="password" name="Password" {...passwordInput} />
        </p>
        <button id="signin-button" type="submit">
          Sign in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
