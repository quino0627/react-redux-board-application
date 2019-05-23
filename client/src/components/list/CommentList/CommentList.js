import React from "react";
import styles from "./CommentList.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";

const cx = classNames.bind(styles);

const CommentItem = ({ body, publishedDate, writer, id }) => {
  return (
    <div className={cx("post-item")}>
      <h5> {id}번째 댓글!</h5>
      <div className={cx("date")}>{publishedDate}</div>
      <div className={cx("writer")}>{writer}</div>
      <p>{body}</p>
    </div>
  );
};

const CommentList = ({ comments, onUpload, onKeyPress, onChange, comment }) => {
  const commentList = comments.map((comment, index) => {
    const { comments_content, comment_at, commenter_username } = comment;
    return (
      <CommentItem
        body={comments_content}
        publishedDate={comment_at}
        key={index}
        id={index}
        writer={commenter_username}
      />
    );
  });
  return (
    <div className={cx("comment-list")}>
      {commentList}
      <div className={cx("post-item")}>
        <div>댓글 달기</div>

        <textarea
          className={cx("post-input")}
          type="comment"
          placeholder="댓글 입력"
          rows="5"
          value={comment}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <Button className={cx("comment")} onClick={onUpload}>
          올리기
        </Button>
      </div>
    </div>
  );
};

export default CommentList;
