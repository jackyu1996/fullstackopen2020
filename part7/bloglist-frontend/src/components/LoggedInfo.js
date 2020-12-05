import React from "react";
import { Button } from "semantic-ui-react";

import { logout } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";

const LoggedInfo = ({ loggedUser }) => {
  const dispatch = useDispatch();

  return (
    <>
      <span>
        {loggedUser.name} logged in
        <Button compact onClick={() => dispatch(logout())}>
          logout
        </Button>
      </span>
    </>
  );
};

export default LoggedInfo;
