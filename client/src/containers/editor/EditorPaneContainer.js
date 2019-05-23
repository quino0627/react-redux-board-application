import React, { Component } from "react";
import EditorPane from "../../components/editor/EditorPane";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as editorActions from "../../store/modules/editor";

class EditorPaneContainer extends Component {
  handleChangeInput = ({ name, value }) => {
    const { EditorActions } = this.props;

    EditorActions.changeInput({ name, value });
  };

  handleChangeRadio = ({ value }) => {
    const { EditorActions } = this.props;
    console.log(value);

    EditorActions.selectRadio({ board_no: value });
  };

  render() {
    const { title, tags, markdown, board_no } = this.props;
    const { handleChangeInput, handleChangeRadio } = this;

    return (
      <EditorPane
        title={title}
        markdown={markdown}
        tags={tags}
        onChangeInput={handleChangeInput}
        onChangeRadio={handleChangeRadio}
      />
    );
  }
}

export default connect(
  state => ({
    title: state.editor.get("title"),
    markdown: state.editor.get("markdown"),
    tags: state.editor.get("tags"),
    board_no: state.editor.get("board_no")
  }),
  dispatch => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(EditorPaneContainer);
