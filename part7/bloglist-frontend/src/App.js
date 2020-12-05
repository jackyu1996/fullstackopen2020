import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Link, Route, useRouteMatch } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoggedInfo from "./components/LoggedInfo";
import BlogList, { Blog } from "./components/BlogList";
import UserList, { User } from "./components/UserList";

import { initBlogs } from "./reducers/blogReducer";
import { initUsers } from "./reducers/userReducer";
import { setUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.loggedUser);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const userMatch = useRouteMatch("/users/:id");
  const blogMatch = useRouteMatch("/blogs/:id");

  const matchedBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  const matchedUser = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  return (
    <>
      <nav>
        <Link to="/blogs">blogs</Link>
        <Link to="/users">users</Link>
        <LoggedInfo loggedUser={loggedUser} />
      </nav>

      <h2>blog app</h2>
      <Notification />

      {!loggedUser.token ? (
        <>
          <h2>log in to application</h2>
          <LoginForm />
        </>
      ) : (
        <BlogForm />
      )}

      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={matchedBlog} />
        </Route>

        <Route path="/users/:id">
          <User user={matchedUser} />
        </Route>

        <Route path="/users">
          <UserList users={users} />
        </Route>

        <Route path="/blogs">
          <BlogList blogs={blogs} />
        </Route>

        <Route path="/">
          <BlogList blogs={blogs} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
