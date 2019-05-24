import React from "react";
import styles from "./MessageWrite.scss";
import Button from "../../../components/common/Button";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const MessageWrite = ({ message, onChange, onUpload }) => {
  return (
    <div className={cx("message-form")}>
      <div className={cx("title")}>쪽지 보내기</div>
      <div className={cx("description")}>쪽지를 보내세요!</div>
      <input type="username" placeholder="보낼 유저의 아이디" />
      <textarea
        className={cx("message-input")}
        type="comment"
        placeholder="댓글 입력"
        rows="20"
        value={message}
        onChange={onChange}
      />
      <div className={cx("message-send")} onClick={onUpload}>
        보내기!
      </div>
    </div>
  );
};

export default MessageWrite;
