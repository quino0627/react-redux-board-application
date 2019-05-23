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
  state = {
    board_type: ""
  };
  editor = null; //에디터 ref
  codeMirror = null; //코드미러 인스턴스
  cursor = null;
  //initialize Editor;
  initializer = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: "markdown",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true
    });
    this.codeMirror.on("change", this.handleChangeMarkdown);
  };

  componentDidMount() {
    this.initializer();
  }

  handleChange = e => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;

    onChangeInput({ name, value });
  };

  handleRadioChange = e => {
    console.log(e.target.value);
    const { onChangeRadio } = this.props;
    onChangeRadio({ value: e.target.value });
  };

  handleChangeMarkdown = doc => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor();
    onChangeInput({
      name: "markdown",
      value: doc.getValue()
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if (!codeMirror) return;
      codeMirror.setValue(this.props.markdown);
      if (!cursor) return;
      codeMirror.setCursor(cursor);
    }
  }

  render() {
    const { handleChange } = this;
    const { tags, title } = this.props;

    return (
      <div className={cx("editor-pane")}>
        <div className={cx("select-board")}>
          <div className={cx("select-title")}>게시판 선택</div>
          <div className={cx("select-radios")}>
            <div>
              <input
                type="radio"
                name="gender"
                value="1"
                onClick={this.handleRadioChange}
              />{" "}
              CN &nbsp;&nbsp;&nbsp;
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="3"
                onClick={this.handleRadioChange}
              />{" "}
              DB &nbsp;&nbsp;&nbsp;
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="4"
                onClick={this.handleRadioChange}
              />{" "}
              잡담
            </div>
          </div>
        </div>

        <input
          className={cx("title")}
          placeholder="제목을 입력하세요"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <div className={cx("code-editor")} ref={ref => (this.editor = ref)} />
        <div className={cx("tags")}>
          <div className={cx("description")}>태그</div>
          <input
            name="tags"
            placeholder="태그를 입력하세요 (쉼표로 구분)"
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EditorPane;
