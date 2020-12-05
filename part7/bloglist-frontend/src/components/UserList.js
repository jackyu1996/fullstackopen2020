import React from "react";
import { Link } from "react-router-dom";

export const User = ({ user }) => {
  if (!user) {
    return "null";
  }

  return (
    <>
      <h2>{user.name}</h2>
      <p>added blogs</p>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  );
};

const UserList = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>username</td>
            <td>blog created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            return (
              <tr key={u.username}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
