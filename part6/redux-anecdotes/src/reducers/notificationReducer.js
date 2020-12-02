const initialState = {
  message: "",
  timer: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET":
      return {
        message: action.message,
        timer: action.timer,
      };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;

export const setNotification = (message, timeout) => {
  return async (dispatch, getState) => {
    let timer = getState().notification.timer;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => dispatch(clearNotification()), timeout * 1000);

    dispatch({
      type: "SET",
      message,
      timer,
    });
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR",
  };
};
