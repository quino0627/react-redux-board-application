import React from "react";
import styles from "./MailBox.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import moment from "moment";

const cx = classNames.bind(styles);

const MailBox = () => {
  const MessageItem = ({ title, body, publishedDate, writer, tags, id }) => {
    // const tagList = tags.map(tag => (
    //   <Link key={tag} to={`/tag/${tag}`}>
    //     #{tag}
    //   </Link>
    // ));
    return (
      <div className={cx("message-item")}>
        <h2>From QUINO0627</h2>
        <div className={cx("date")}>2019-05-25, 17:34</div>

        <p>
          {body}
        </p>
      </div>
    );
  };
  return (
    <div className={cx("message-list")}>
      <MessageItem body={"안녕 반가워 나는 송동욱이라구 해 한번에 성공했으면 좋겠다 고마워 그럼 이만!안녕 반가워 나는 송동욱이라구 해 한번에 성공했으면 좋겠다 고마워 그럼 이만!안녕 반가워 나는 송동욱이라구 해 한번에 성공했으면 좋겠다 고마워 그럼 이만!안녕 반가워 나는 송동욱이라구 해 한번에 성공했으면 좋겠다 고마워 그럼 이만!"}/>
      <MessageItem body={"안녕 반가워 나는 송동욱이라구 해 한번에 성공했으면 좋겠다 고마워 그럼 이만!"}/>
      <MessageItem />
      <MessageItem />
      <MessageItem />
      <MessageItem />
      <MessageItem />
    </div>
  );
};

export default MailBox;
