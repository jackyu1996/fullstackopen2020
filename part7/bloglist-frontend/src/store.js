import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import notificationReducer from "./reducers/notificationReducer";
import blogFormReducer from "./reducers/blogFormReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blog: blogFormReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
