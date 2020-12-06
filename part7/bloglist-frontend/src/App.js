import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Link, Route, useRouteMatch } from "react-router-dom";
import { Container, Menu, Header, Icon, Divider } from "semantic-ui-react";

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
      <Container>
        <Menu>
          <Menu.Item as={Link} to="/blogs">
            blogs
          </Menu.Item>
          <Menu.Item as={Link} to="/users">
            users
          </Menu.Item>
          {loggedUser.name ? (
            <Menu.Item>
              <LoggedInfo loggedUser={loggedUser} />
            </Menu.Item>
          ) : null}
        </Menu>

        <Header as="h1">
          <Icon name="file" />
          <Header.Content>blog app</Header.Content>
        </Header>
        <Notification />

        {!loggedUser.token ? (
          <>
            <h2>log in to application</h2>
            <LoginForm />
          </>
        ) : (
          <BlogForm />
        )}

        <Divider />

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

      </Container>
    </>
  );
};

export default App;
