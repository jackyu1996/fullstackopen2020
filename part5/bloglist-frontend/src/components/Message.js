import '../index.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, setMessage }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [message, setMessage]);

  if (message && message.content) {
    return <p className={message.type}>{message.content}</p>;
  } else {
    return '';
  }
};

Message.propTypes = {
  message: PropTypes.object,
  setMessage: PropTypes.func.isRequired,
};

export default Message;
