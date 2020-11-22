import "../index.css";
import { useEffect } from "react";

const Message = ({ message, setMessage }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [message, setMessage]);

  if (message && message.content) {
    return <p className={message.type}>{message.content}</p>;
  } else {
    return "";
  }
};

export default Message;
