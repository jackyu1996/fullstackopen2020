import React from "react";
import { Link } from "react-router-dom";
import { Table, List } from "semantic-ui-react";

export const User = ({ user }) => {
  if (!user) {
    return "";
  }

  return (
    <>
      <h2>{user.name}</h2>
      <p>added blogs</p>
      <List bulleted>
        {user.blogs.map((b) => (
          <List.Item as={Link} to={`/blogs/${b.id}`} key={b.id}>
            {b.title}
          </List.Item>
        ))}
      </List>
    </>
  );
};

const UserList = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <Table basic="very" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>username</Table.HeaderCell>
            <Table.HeaderCell>blog created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((u) => (
            <Table.Row key={u.username}>
              <Table.Cell>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </Table.Cell>
              <Table.Cell>{u.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default UserList;
