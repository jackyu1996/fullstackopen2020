import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form } from "semantic-ui-react";

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
      setSuccess(`${createdBlog.title} by ${createdBlog.author} created!`)
    );
    clearFields();
  };

  return (
    <>
      <Button
        positive
        style={showWhenVisible}
        onClick={() => setVisible(!visible)}
      >
        create new
      </Button>
      <Form onSubmit={handleAdd} style={hideWhenVisible}>
        <Form.Field>
          <Input icon="header" label="Title" type="text" {...titleInput} />
        </Form.Field>

        <Form.Field>
          <Input icon="write" label="Author" type="text" {...authorInput} />
        </Form.Field>

        <Form.Field>
          <Input icon="linkify" label="URL" type="text" {...urlInput} />
        </Form.Field>

        <Button positive id="createButton" type="submit">
          create
        </Button>

        <Button negative type="button" onClick={() => setVisible(!visible)}>
          cancel
        </Button>
      </Form>
    </>
  );
};

export default BlogForm;
