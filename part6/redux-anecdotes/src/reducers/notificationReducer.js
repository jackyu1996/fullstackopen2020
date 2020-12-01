const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "VOTE":
    case "NEW_ANECDOTE":
      return action.message;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

export default notificationReducer;

export const voteUpNotification = (message) => {
  return {
    type: "VOTE",
    message: `you voted '${message}'`,
  };
};

export const newAnecdoteNotification = (message) => {
  return {
    type: "NEW_ANECDOTE",
    message: `you created '${message}'`,
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR",
  };
};
