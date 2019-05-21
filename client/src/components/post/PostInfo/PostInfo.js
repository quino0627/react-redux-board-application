import React from "react";
import styles from "./PostInfo.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import momnet from "moment";

const cx = classNames.bind(styles);

const PostInfo = ({ publishedDate, title, tags }) => {
  console.log(publishedDate);
  return (
    <div className={cx("post-info")}>
      <div className={cx("info")}>
        <h1>{title}</h1>
        <div className={cx("tags")}>
          {tags &&
            tags.map(tag => (
              <Link key={tag} to={`/tag/${tag}`}>
                #{tag}
              </Link>
            ))}
        </div>
        <div className={cx("date")}>{publishedDate}</div>
      </div>
    </div>
  );
};

export default PostInfo;
