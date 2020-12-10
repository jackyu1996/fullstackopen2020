import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("all");

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const allBooks = result.data.allBooks;

  const allGenres = allBooks
    .map((b) => b.genres)
    .reduce((acc, cur) => {
      cur.forEach((g) => {
        if (acc.indexOf(g) === -1) {
          acc.push(g);
        }
      });
      return acc;
    }, []);

  const selectedBooks =
    genre === "all"
      ? allBooks
      : allBooks.filter((b) => b.genres.indexOf(genre) !== -1);

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <b>{genre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {selectedBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {allGenres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}

      <button onClick={() => setGenre("all")}>all genres</button>
    </div>
  );
};

export default Books;
