import React, { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Message from './components/Message';
import BlogForm from './components/BlogForm';
import LoggedInfo from './components/LoggedInfo';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ type: 'success', content: '' });

  const blogFormRef = useRef();

  useEffect(() => {
    (async () => {
      const response = await blogService.getAll();
      setBlogs(response.sort((a, b) => b.likes - a.likes));
    })();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
    } catch (e) {
      setMessage({ type: 'error', content: e.message });
    }
  };

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
      setMessage({ type: 'error', content: e.message });
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
        setMessage({ type: 'error', content: e.message });
      }
    }
  };

  return (
    <>
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Message message={message} setMessage={setMessage} />
          <LoginForm
            handleLogin={loginService.login}
            setUser={setUser}
            setMessage={setMessage}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Message message={message} setMessage={setMessage} />
          <LoggedInfo user={user} setUser={setUser} />
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} setMessage={setMessage} />
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
