import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  if (!show) {
    return null;
  }

  const allBooks = result.data.allBooks;
  const favoriteGenre = meResult.data.me.favoriteGenre;

  const selectedBooks = allBooks.filter(
    (b) => b.genres.indexOf(favoriteGenre) !== -1
  );

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
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
    </div>
  );
};

export default Recommend;
