import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const SetBirthyear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [modifyAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (e) => {
    e.preventDefault();

    modifyAuthor({
      variables: {
        name,
        born: Number.parseInt(born),
      },
    });

    setName("");
    setBorn("");
  };

  return (
    <>
      <form onSubmit={submit}>
        <p>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </p>
        <p>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </p>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

const Authors = ({ show }) => {
  const result = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>

      <SetBirthyear authors={result.data.allAuthors} />
    </div>
  );
};

export default Authors;
