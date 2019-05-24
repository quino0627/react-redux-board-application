import React, { Component } from "react";
import styles from "./MessageWrite.scss";
import Button from "../../../components/common/Button";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

// receiver_username,
//   message_content,
//   onChange,
//   onUpload

class MessageWrite extends Component {
  handleChange = e => {
    const { onChange } = this.props;
    const { value, name } = e.target;
    onChange({ name, value });
  };

  render() {
    const { receiver_username, message_content, onUpload } = this.props;
    const { handleChange } = this;
    return (
      <div className={cx("message-form")}>
        <div className={cx("title")}>쪽지 보내기</div>
        <div className={cx("description")}>쪽지를 보내세요!</div>
        <input
          type="username"
          placeholder="보낼 유저의 아이디"
          value={receiver_username}
          onChange={handleChange}
          name="receiver_username"
        />
        <textarea
          className={cx("message-input")}
          type="comment"
          placeholder="댓글 입력"
          rows="20"
          value={message_content}
          onChange={handleChange}
          name="message_content"
        />
        <div className={cx("message-send")} onClick={onUpload}>
          보내기!
        </div>
      </div>
    );
  }
}

export default MessageWrite;
