import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CommentList from "../../components/list/CommentList";
import * as postActions from "../../store/modules/post";

class CommentListContainer extends Component {
  handleChange = e => {
    const { value } = e.target;
    const { CommentListActions } = this.props;
    CommentListActions.changeInput(value);
  };

  handleUpload = async () => {
    const { CommentListActions, comment, id } = this.props;
    console.log(comment);
    try {
      const result = await CommentListActions.writeComment({
        body: comment,
        id: id
      });
      console.log(result);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  getCommentList = async () => {
    const { CommentListActions, id } = this.props;
    try {
      await CommentListActions.getCommentList({ id: id });
    } catch (e) {}
  };

  handleKeyPress = e => {
    // 엔터키가 눌리면 로그인 호출
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };

  componentDidMount() {
    this.getCommentList();
  }

  render() {
    const { handleChange, handleKeyPress, handleUpload } = this;
    const { loading, comments, comment } = this.props;

    if (loading) return null;

    return (
      <div>
        <CommentList
          onUpload={handleUpload}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          comment={comment}
          comments={comments}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    comments: state.post.get("comments"),
    loading: state.pender.pending["post/GET_COMMENTLIST"],
    comment: state.post.get("comment")
  }),
  dispatch => ({
    CommentListActions: bindActionCreators(postActions, dispatch)
  })
)(CommentListContainer);
