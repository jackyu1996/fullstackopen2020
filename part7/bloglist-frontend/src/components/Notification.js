import React from "react";
import { useSelector } from "react-redux";
import { Message } from "semantic-ui-react";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification && notification.content) {
    if (notification.type === "error") {
      return <Message negative>{notification.content}</Message>;
    } else {
      return <Message>{notification.content}</Message>;
    }
  } else {
    return "";
  }
};

export default Notification;
