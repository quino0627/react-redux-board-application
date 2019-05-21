import React from "react";
import styles from "./PostBody.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import MarkdownRender from "../../common/MarkdownRender";

const cx = classNames.bind(styles);

const PostBody = ({ body }) => {
  return (
    <div className={cx("post-body")}>
      <div className={cx("paper")}>
        <MarkdownRender markdown={body} />
      </div>
    </div>
  );
};

export default PostBody;
