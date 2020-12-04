import blogService from "../services/blogs";
import { setSuccess, setError } from "../reducers/notificationReducer";

const initialState = {
  title: "",
  author: "",
  url: "",
};

const BlogFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET":
      return action.data;
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

export const clearFields = () => {
  return {
    type: "CLEAR",
  };
};

export const newBlog = (title, author, url) => {
  return async (dispatch, getState) => {
    try {
      const data = {
        title: title,
        author: author,
        url: url,
      };

      blogService.create(data);
      dispatch(setSuccess(`a new blog ${title} by ${author} added`));
      dispatch({
        type: "SET",
        data,
      });
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
};

export default BlogFormReducer;
