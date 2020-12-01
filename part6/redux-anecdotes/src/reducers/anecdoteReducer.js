import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "ADD_ANECDOTE":
      return state.concat(action.data);
    case "VOTE_UP":
      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : action.data
      );
    default:
      return state;
  }
};

export default reducer;

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.newAnecdote(content);
    dispatch({
      type: "ADD_ANECDOTE",
      data: anecdote,
    });
  };
};

export const voteUp = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.voteUp(anecdote);
    dispatch({
      type: "VOTE_UP",
      data: updatedAnecdote,
    });
  };
};
