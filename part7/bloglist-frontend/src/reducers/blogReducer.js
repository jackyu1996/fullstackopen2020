import blogService from "../services/blogs";
import { setSuccess, setError } from "../reducers/notificationReducer";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "ADD_NEW":
      return state.concat(action.data);
    case "ADD_COMMENT":
      return state.map((b) => {
        return b.id === action.blogId
          ? {
              ...b,
              comments: b.comments.concat({
                id: action.id,
                content: action.content,
              }),
            }
          : b;
      });
    case "LIKE":
      return state.map((b) => (b.id === action.data.id ? action.data : b));
    case "DELETE":
      return state.filter((b) => b.id !== action.blogId);
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async (dispatch) => {
    try {
      const data = await blogService.getAll();
      dispatch({
        type: "INIT_BLOGS",
        data,
      });
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
};

export const addNew = (createdBlog) => {
  return async (dispatch) => {
    try {
      const data = await blogService.create(createdBlog);
      dispatch({
        type: "ADD_NEW",
        data,
      });
      setSuccess(`a new blog ${data.title} by ${data.author} added`);
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const data = {
        ...blog,
        likes: blog.likes + 1,
      };
      await blogService.update(blog.id, data);
      dispatch({
        type: "LIKE",
        data,
      });
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
};

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogId);
      dispatch({
        type: "DELETE",
        blogId,
      });
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
};

export const addComment = (blogId, content) => {
  return async (dispatch) => {
    try {
      const data = await blogService.createComment(blogId, content);
      dispatch({
        type: "ADD_COMMENT",
        blogId,
        id: data.id,
        content: data.content,
      });
    } catch (e) {
      setError(e.message);
    }
  };
};

export default blogReducer;
