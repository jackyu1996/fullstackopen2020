import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { setError } from "./reducers/notificationReducer";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoggedInfo from "./components/LoggedInfo";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    (async () => {
      const response = await blogService.getAll();
      setBlogs(response.sort((a, b) => b.likes - a.likes));
    })();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  //const createBlog = async (newBlog) => {
  //try {
  //blogFormRef.current.toggleVisibility();
  //const returnedBlog = await blogService.create(newBlog);
  //setBlogs(blogs.concat(returnedBlog));
  //} catch (e) {
  //dispatch(setError(e.message));
  //}
  //};

  const addLike = async (updatedBlog) => {
    try {
      await blogService.update(updatedBlog.id, updatedBlog);
      setBlogs(
        blogs
          .map((b) => {
            b.likes = b.id === updatedBlog.id ? updatedBlog.likes : b.likes;
            return b;
          })
          .sort((a, b) => b.likes - a.likes)
      );
    } catch (e) {
      dispatch(setError(e.message));
    }
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(
          blogs
            .filter((b) => b.id !== blog.id)
            .sort((a, b) => b.likes - a.likes)
        );
      } catch (e) {
        dispatch(setError(e.message));
      }
    }
  };

  return (
    <>
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm handleLogin={loginService.login} setUser={setUser} />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          <LoggedInfo user={user} setUser={setUser} />
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          loggedUser={user}
          removeBlog={removeBlog}
        />
      ))}
    </>
  );
};

export default App;
