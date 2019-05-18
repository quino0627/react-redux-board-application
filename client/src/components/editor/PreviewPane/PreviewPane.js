import React from "react";
import styles from "./PreviewPane.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PreviewPane = ({ markdown, title }) => {
  return (
    <div className={cx("preview-pane")}>
      <h1 className={cx("title")}>TITLE</h1>
      <div>내용</div>
    </div>
  );
};

export default PreviewPane;
