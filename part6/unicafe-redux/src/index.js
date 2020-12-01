import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const genDispatch = (type) => () =>
    store.dispatch({ type: type.toUpperCase() });

  return (
    <div>
      <button onClick={genDispatch("good")}>good</button>
      <button onClick={genDispatch("ok")}>neutral</button>
      <button onClick={genDispatch("bad")}>bad</button>
      <button onClick={genDispatch("zero")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
