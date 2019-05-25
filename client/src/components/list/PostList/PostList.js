import React from "react";
import styles from "./PostList.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import moment from "moment";
import removeMd from "remove-markdown";

const cx = classNames.bind(styles);

const PostItem = ({ title, body, publishedDate, writer, tags, id }) => {
  if (body.length > 100) {
    body = body.slice(0, 100) + " ... ";
  }
  return (
    <div className={cx("post-item")}>
      {id}번 게시글
      <h2>
        <Link to={`/post/${id}`}>
          <h2>{title}</h2>
        </Link>
      </h2>
      <div className={cx("date")}>{publishedDate}</div>
      <div className={cx("writer")}>{writer}</div>
      <p>{removeMd(body)}</p>
    </div>
  );
};

const PostList = ({ posts }) => {
  const postList = posts.map(post => {
    const {
      post_no,
      post_title,
      post_content,
      created_at,
      writer,
      tags
    } = post;
    return (
      <PostItem
        title={post_title}
        body={post_content}
        publishedDate={created_at}
        tags={tags}
        key={post_no}
        id={post_no}
        writer={writer}
      />
    );
  });
  return <div className={cx("post-list")}>{postList}</div>;
};

export default PostList;
