import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Anecdote = ({ text }) => {
  return <p>{text}</p>;
};

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const Stat = ({ votes }) => {
  return <p>has {votes} votes</p>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  const randomSelection = () => {
    return Math.floor(Math.random() * Math.floor(anecdotes.length));
  };

  const voteHandler = () => {
    const newvotes = [...votes];
    newvotes[selected]++;
    setVotes(newvotes);
  };

  let maxVoteIdx = votes.indexOf(Math.max(...votes));

  return (
    <>
      <Header text="Anecdote of the day" />
      <Anecdote text={props.anecdotes[selected]} />
      <Stat votes={votes[selected]} />
      <Button handler={voteHandler} text="vote" />
      <Button
        handler={() => {
          setSelected(randomSelection());
        }}
        text="next anecdote"
      />

      <Header text="Anecdote with most votes" />
      <Anecdote text={props.anecdotes[maxVoteIdx]} />
      <Stat votes={votes[maxVoteIdx]} />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
