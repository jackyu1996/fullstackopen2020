import React from 'react';
import PropTypes from 'prop-types';

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

PropTypes.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default LoggedInfo;
