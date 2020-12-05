import React from "react";
import { useDispatch } from "react-redux";
import { Header, Form, Button, List, Input } from "semantic-ui-react";

import { useField } from "../hooks";
import { addComment } from "../reducers/blogReducer";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();

  const { reset: resetInput, ...commentInput } = useField("comment");

  return (
    <>
      <Header as="h3">comments</Header>
      <Form>
        <Form.Field>
          <Input placeholder="Your wise words here!" {...commentInput} />
          <Button
            onClick={() => dispatch(addComment(blog.id, commentInput.value))}
          >
            add comment
          </Button>
        </Form.Field>
      </Form>
      <List bulleted>
        {blog.comments.map((c) => (
          <List.Item key={c.id}>{c.content}</List.Item>
        ))}
      </List>
    </>
  );
};

export default Comments;
