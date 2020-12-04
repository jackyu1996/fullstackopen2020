import React from "react";
import { useField } from "../hooks";
import { newBlog } from "../reducers/blogFormReducer";
import { useDispatch } from "react-redux";

const BlogForm = () => {
  const { reset: titleReset, ...titleInput } = useField("title");
  const { reset: authorReset, ...authorInput } = useField("author");
  const { reset: urlReset, ...urlInput } = useField("url");

  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();

    dispatch(newBlog(titleInput.value, authorInput.value, urlInput.value));
    titleReset();
    authorReset();
    urlReset();
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
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
    </div>
  );
};

export default BlogForm;
