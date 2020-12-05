import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Item, Button } from "semantic-ui-react";

import { likeBlog, removeBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import Comments from "./Comments";

export const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const histroy = useHistory();

  const handleLike = (blog) => {
    blogService.setToken(loggedUser.token);
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      blogService.setToken(loggedUser.token);
      dispatch(removeBlog(blog.id));
      histroy.push("/blogs");
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
        <Button compact onClick={() => handleLike(blog)}>
          like
        </Button>
      </p>
      <p>added by {blog.user.username}</p>

      {loggedUser && loggedUser.username === blog.user.username ? (
        <Button negative onClick={() => handleDelete(blog)}>
          remove
        </Button>
      ) : (
        ""
      )}

      <Comments blog={blog} />
    </div>
  );
};

const BlogList = ({ blogs }) => {
  return (
    <>
      <Item.Group>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Item as={Link} key={blog.id} to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Item>
          ))}
      </Item.Group>
    </>
  );
};

export default BlogList;
