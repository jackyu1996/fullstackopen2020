import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog, setMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };

      createBlog(newBlog);
      setMessage({
        type: 'success',
        content: `a new blog ${title} by ${author} added`,
      });

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (e) {
      setMessage({ type: 'error', content: e.message });
    }
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <p>
          title:{' '}
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>

        <p>
          author:{' '}
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>

        <p>
          url:{' '}
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </p>

        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default BlogForm;
