import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = () => {
  return axios.get(baseUrl).then(({ data }) => data);
};

const newAnecdote = (content) => {
  return axios
    .post(baseUrl, {
      content,
      id: getId(),
      votes: 0,
    })
    .then(({ data }) => data);
};

const voteUp = (anecdote) => {
  return axios
    .put(`${baseUrl}/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    .then(({ data }) => data);
};

export default { getAll, newAnecdote, voteUp };
