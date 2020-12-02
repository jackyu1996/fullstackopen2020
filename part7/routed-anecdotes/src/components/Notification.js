import React, { useEffect } from "react";

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification("");
    }, 10000);

    return () => clearTimeout(timeout);
  }, [notification, setNotification]);

  return notification ? <p>{notification}</p> : "";
};

export default Notification;
