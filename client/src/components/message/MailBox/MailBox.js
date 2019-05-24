import React from "react";
import styles from "./MailBox.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import moment from "moment";

const cx = classNames.bind(styles);

const MessageItem = ({ sender_username, message_content, message_at }) => {
  // const tagList = tags.map(tag => (
  //   <Link key={tag} to={`/tag/${tag}`}>
  //     #{tag}
  //   </Link>
  // ));
  return (
    <div className={cx("message-item")}>
      <h2>From {sender_username}</h2>
      <div className={cx("date")}>{message_at}</div>

      <p>{message_content}</p>
    </div>
  );
};

const MailBox = ({ messages }) => {
  console.log("MESSAGES", messages);
  const messageList = messages.map((message, index) => {
    const { sender_username, message_content } = message;
    return (
      <MessageItem
        sender_username={sender_username}
        message_content={message_content}
      />
    );
  });
  return <div className={cx("message-list")}>{messageList}</div>;
};

export default MailBox;
