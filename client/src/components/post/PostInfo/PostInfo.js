import React from "react";
import styles from "./PostInfo.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PostInfo = () => {
  return (
    <div className={cx("post-info")}>
      <div className={cx("info")}>
        <h1>타이틀</h1>
        <div className={cx("tags")}>
          <a href="">#태그</a>
          <a href="">#태그</a>
          <a href="">#태그</a>
        </div>
        <div className={cx("date")}>Oct 29, 2019</div>
      </div>
    </div>
  );
};

export default PostInfo;
