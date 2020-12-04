import React from 'react';

const LoggedInfo = ({ user, setUser }) => {
  return (
    <>
      <p>
        {user.name} logged in
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBloglistUser');
            setUser(null);
          }}
        >
          {' '}
          logout
        </button>
      </p>
    </>
  );
};

export default LoggedInfo;
