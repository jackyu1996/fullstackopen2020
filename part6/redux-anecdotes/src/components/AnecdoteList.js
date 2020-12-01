import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteUp } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <p>{anecdote.content}</p>
      <p>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </p>
    </>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((a) => a.content.includes(state.filter));
  });

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteUp(anecdote));
            dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
          }}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
