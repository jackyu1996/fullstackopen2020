import React from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Form } from "semantic-ui-react";

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
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Input
            icon="user"
            label="Username"
            type="text"
            name="Username"
            {...usernameInput}
          />
        </Form.Field>

        <Form.Field>
          <Input
            icon="user secret"
            label="Password"
            type="password"
            name="Password"
            {...passwordInput}
          />
        </Form.Field>

        <Button positive id="signin-button" type="submit">
          Sign in
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
