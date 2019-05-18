import React, { useEffect } from "react";
import styles from "./PreviewPane.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import MarkdownRender from "../../common/MarkdownRender";

const cx = classNames.bind(styles);

const PreviewPane = ({ markdown, title }) => {
  useEffect(() => {
    console.log(title);
  });
  return (
    <div className={cx("preview-pane")}>
      <h1 className={cx("title")}>{title}</h1>
      <MarkdownRender markdown={markdown} />
    </div>
  );
};

export default PreviewPane;
