const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      return action.message;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

export default notificationReducer;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: "SET",
      message,
    });
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR",
  };
};
