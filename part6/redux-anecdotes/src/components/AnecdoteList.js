import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteUp } from "../reducers/anecdoteReducer";

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
  const anecdotes = useSelector((state) => state);

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteUp(anecdote.id))}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
