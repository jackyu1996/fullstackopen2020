import React from "react";
import { connect } from "react-redux";
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

const AnecdoteList = (props) => {
  return (
    <>
      {props.anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.voteUp(anecdote);
            props.setNotification(`you voted '${anecdote.content}'`, 5);
          }}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((a) => a.content.includes(state.filter)),
  };
};

export default connect(mapStateToProps, { voteUp, setNotification })(
  AnecdoteList
);
