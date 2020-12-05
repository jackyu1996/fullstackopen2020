import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks";
import { addNew } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { setSuccess } from "../reducers/notificationReducer";

const BlogForm = () => {
  const { reset: titleReset, ...titleInput } = useField("title");
  const { reset: authorReset, ...authorInput } = useField("author");
  const { reset: urlReset, ...urlInput } = useField("url");

  const [visible, setVisible] = useState(true);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const clearFields = () => {
    titleReset();
    authorReset();
    urlReset();
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const createdBlog = {
      title: titleInput.value,
      author: authorInput.value,
      url: urlInput.value,
      likes: 0,
    };

    blogService.setToken(loggedUser.token);
    dispatch(addNew(createdBlog));

    dispatch(
      setSuccess(`${createdBlog.title} by ${createdBlog.author} created?`)
    );
    clearFields();
  };

  return (
    <>
      <button style={showWhenVisible} onClick={() => setVisible(!visible)}>
        create new
      </button>
      <form onSubmit={handleAdd} style={hideWhenVisible}>
        <p>
          title: <input type="text" {...titleInput} />
        </p>

        <p>
          author: <input type="text" {...authorInput} />
        </p>

        <p>
          url: <input type="text" {...urlInput} />
        </p>

        <button id="createButton" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
