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

  render() {
    const { title, tags, markdown } = this.props;
    const { handleChangeInput } = this;

    return (
      <EditorPane
        title={title}
        markdown={markdown}
        tags={tags}
        onChangeInput={handleChangeInput}
      />
    );
  }
}

export default connect(
  state => ({
    title: state.title,
    markdown: state.markdown,
    tags: state.tags
  }),
  dispatch => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(EditorPaneContainer);
