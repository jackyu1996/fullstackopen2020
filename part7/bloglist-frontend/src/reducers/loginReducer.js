import loginService from "../services/login.js";
import { setError } from "../reducers/notificationReducer";

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
    case "SET_USER":
      return action.data;
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default loginReducer;

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      const data = {
        username: user.username,
        name: user.name,
        token: user.token,
      };

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      dispatch({
        type: "LOGIN",
        data,
      });
    } catch (e) {
      dispatch(setError("wrong username or password"));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem("loggedBloglistUser");
      dispatch({
        type: "LOGOUT",
      });
    } catch (e) {
      setError(e.message);
    }
  };
};

export const setUser = () => {
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
      if (loggedUserJSON) {
        const data = JSON.parse(loggedUserJSON);
        dispatch({
          type: "SET_USER",
          data,
        });
      }
    } catch (e) {
      setError(e.message);
    }
  };
};
