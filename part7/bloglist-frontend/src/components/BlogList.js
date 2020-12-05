import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import Comments from "./Comments";

export const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleLike = (blog) => {
    blogService.setToken(loggedUser.token);
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      blogService.setToken(loggedUser.token);
      dispatch(removeBlog(blog.id));
    }
  };

  if (!blog) {
    return "";
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{" "}
        <button onClick={() => handleLike(blog)}>like</button>
      </p>
      <p>added by {blog.user.username}</p>

      {loggedUser && loggedUser.username === blog.user.username ? (
        <button onClick={() => handleDelete(blog)}>remove</button>
      ) : (
        ""
      )}

      <Comments blog={blog} />
    </div>
  );
};

const BlogList = ({ blogs }) => {
  const blogListStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <p style={blogListStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </p>
        ))}
    </>
  );
};

export default BlogList;
