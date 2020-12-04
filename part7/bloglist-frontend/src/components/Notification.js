import "../index.css";
import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification && notification.content) {
    return <p className={notification.type}>{notification.content}</p>;
  } else {
    return "";
  }
};

export default Notification;
