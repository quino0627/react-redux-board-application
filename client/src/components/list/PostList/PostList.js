import React from "react";
import styles from "./PostList.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import moment from "moment";
import removeMd from "remove-markdown";

const cx = classNames.bind(styles);

const PostItem = ({ title, body, publishedDate, tags, id }) => {
  // const tagList = tags.map(tag => (
  //   <Link key={tag} to={`/tag/${tag}`}>
  //     #{tag}
  //   </Link>
  // ));
  return (
    <div className={cx("post-item")}>
      <h2>
        <Link to={`/post/${id}`}>{title}</Link>
      </h2>
      <div className={cx("date")}>{publishedDate}</div>
      <p>{removeMd(body)}</p>
      <div className={cx("tags")}>
        <a href="">#태그</a>
        <a href="">#태그</a>
        <a href="">#태그</a>
      </div>
    </div>
  );
};

const PostList = ({ posts }) => {
  const postList = posts.map(post => {
    const { post_no, post_title, post_content, created_at, tags } = post;
    return (
      <PostItem
        title={post_title}
        body={post_content}
        publishedDate={created_at}
        tags={tags}
        key={post_no}
        id={post_no}
      />
    );
  });
  return <div className={cx("post-list")}>{postList}</div>;
};

export default PostList;
