const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SUCCESS":
      return { type: "success", content: action.content };
    case "SET_ERROR":
      return { type: "error", content: action.content };
    case "CLEAR":
      return {};
    default:
      return state;
  }
};

const genActionCreator = (type) => (content) => {
  return async (dispatch) => {
    setTimeout(() => dispatch(clearNotification()), 5000);

    dispatch({
      type: `SET_${type.toUpperCase()}`,
      content,
    });
  };
};

export const setSuccess = genActionCreator("success");
export const setError = genActionCreator("error");
export const clearNotification = () => {
  return {
    type: "CLEAR",
  };
};

export default notificationReducer;
