import React, { Component } from "react";
import styles from "./EditorTemplate.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

class EditorTemplate extends Component {
  render() {
    const { Headers, editor, preivew } = this.props;

    return <div className={cx("editor-template'")}>asdf</div>;
  }
}

export default EditorTemplate;
