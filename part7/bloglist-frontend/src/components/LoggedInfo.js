import React from "react";
import { logout } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";

const LoggedInfo = ({ loggedUser }) => {
  const dispatch = useDispatch();
  
  return (
    <>
      <span>
        {loggedUser.name} logged in
        <button onClick={() => dispatch(logout())}> logout</button>
      </span>
    </>
  );
};

export default LoggedInfo;
