import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GENRE_BOOKS, ME } from "../queries";

const Recommend = ({ show }) => {
  const [me, setMe] = useState(null);
  const meResult = useQuery(ME);
  const [getBooks, { data }] = useLazyQuery(GENRE_BOOKS);

  useEffect(() => {
    if (meResult.data) {
      setMe(meResult.data.me);
    }
  }, [meResult.data]);

  useEffect(() => {
    if (me) {
      getBooks({ variables: { genre: me.favoriteGenre } });
    }
  }, [me, getBooks]);

  if (!show) {
    return null;
  }

  if (meResult.loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{me.favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((b) => (
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
