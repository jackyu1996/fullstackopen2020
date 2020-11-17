import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const Statistic = ({ type, data }) => {
  let dataFormat;
  dataFormat = data;
  if (type === "positive") {
    dataFormat = `${data} %`;
  }
  return (
    <tr>
      <td>{type}</td>
      <td>{dataFormat}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <Statistic type="good" data={good} />
        <Statistic type="neutral" data={neutral} />
        <Statistic type="bad" data={bad} />
        <Statistic type="average" data={good + bad + neutral} />
        <Statistic
          type="positive"
          data={(good / (good + bad + neutral)) * 100}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button
        text="good"
        handler={() => {
          setGood(good + 1);
        }}
      />
      <Button
        text="neutral"
        handler={() => {
          setNeutral(neutral + 1);
        }}
      />
      <Button
        text="bad"
        handler={() => {
          setBad(bad + 1);
        }}
      />

      <Header text="statistics" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
