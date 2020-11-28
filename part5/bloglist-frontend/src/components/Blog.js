import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Blog = ({ blog, addLike, loggedUser, removeBlog }) => {
  const [visible, setVisible] = useState(false);
  const buttonLabel = visible ? 'hide' : 'view';
  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle} className="blogDiv">
      {blog.title} {blog.author}{' '}
      <button onClick={handleClick}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{' '}
          <button onClick={() => addLike({ ...blog, likes: blog.likes + 1 })}>
            like
          </button>
        </p>
        <p>{blog.user.username}</p>
        {loggedUser && loggedUser.username === blog.user.username ? (
          <button onClick={() => removeBlog(blog)}>remove</button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func,
  loggedUser: PropTypes.object,
  removeBlog: PropTypes.func,
};

export default Blog;
