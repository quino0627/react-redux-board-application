import React, { Component } from "react";
import styles from "./EditorPane.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import CodeMirror from "codemirror";

import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/css/css";
import "codemirror/mode/shell/shell";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

const cx = classNames.bind(styles);

class EditorPane extends Component {
  editor = null; //에디터 ref
  codeMirror = null; //코드미러 인스턴스

  //initialize Editor;
  initializer = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: "markdown",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true
    });
  };

  componentDidMount() {
    this.initializer();
  }
  render() {
    return (
      <div className={cx("editor-pane")}>
        <input
          className={cx("title")}
          placeholder="제목을 입력하세요"
          name="title"
        />
        <div className={cx("code-editor")} ref={ref => (this.editor = ref)} />
        <div className={cx("tags")}>
          <div className={cx("description")}>태그</div>
          <input name="tags" placeholder="태그를 입력하세요 (쉼표로 구분)" />
        </div>
      </div>
    );
  }
}

export default EditorPane;
