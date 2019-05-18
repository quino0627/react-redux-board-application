import React, { Component } from "react";
import { connect } from "react-redux";
import PreviewPane from "../../components/editor/PreviewPane";

class PreviewPaneContainer extends Component {
  render() {
    const { markdown, title } = this.props;
    return <PreviewPane title={title} markdown={markdown} />;
  }
}

export default connect(state => ({
  title: state.editor.title,
  markdown: state.editor.markdown
}))(PreviewPaneContainer);
