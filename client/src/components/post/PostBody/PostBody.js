import React from "react";
import styles from "./PostBody.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PostBody = () => {
  return (
    <div className={cx("post-body")}>
      <div className={cx("paper")}>content</div>
    </div>
  );
};

export default PostBody;
