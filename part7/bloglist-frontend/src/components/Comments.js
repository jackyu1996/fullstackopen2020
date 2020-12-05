import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { addComment } from "../reducers/blogReducer";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();

  const { reset: resetInput, ...commentInput } = useField("comment");

  return (
    <>
      <h3>comments</h3>
      <p>
        <input {...commentInput} />
        <button
          onClick={() => dispatch(addComment(blog.id, commentInput.value))}
        >
          add comment
        </button>
      </p>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
