import React, { Component } from "react";
import EditorHeader from "../../components/editor/EditorHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import "react-notifications/lib/notifications.css";
import * as editorActions from "../../store/modules/editor";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class EditorHeaderContainer extends Component {
  createNotification = type => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "notyours":
          NotificationManager.warning(
            "당신의 게시물이 아닙니다",
            "Close after 3000ms",
            3000
          );
          break;
        case "warning":
          NotificationManager.warning(
            "게시판을 선택해 주세요",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
        default:
          break;
      }
    };
  };
  componentDidMount() {
    const { EditorActions, location } = this.props;
    EditorActions.initialize(); // 에디터를 초기화 합니다.
    // 쿼리 파싱
    const { id } = queryString.parse(location.search);
    if (id) {
      // id 가 존재하는 경우 포스트 불러오기
      EditorActions.getPost(id);
    }
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleSubmit = async () => {
    console.log("handleSubmit activated and ", this.props);

    let {
      title,
      markdown,
      EditorActions,
      history,
      location,
      board_no
    } = this.props;
    console.log(board_no, typeof board_no);
    board_no = board_no * 1;
    if (board_no === null) {
      this.createNotification("warning")();
      return;
    }
    const post = {
      title,
      body: markdown,
      board_no: board_no * 1
    };
    try {
      //  id 가 존재하는 경우 editPost 호출

      const { id } = queryString.parse(location.search);
      if (id) {
        await EditorActions.editPost({ id, ...post });
        history.push(`/post/${id}`);
        return;
      }
      await EditorActions.writePost(post);
      console.log("AFTER writePOST");
      // 페이지를 이동시킵니다. 주의: postId 를 상단에서 레퍼런스를 만들지 않고
      // 이 자리에서 this.props.postId 를 조회해주어야합니다. (현재의 값을 불러오기 위함)
      history.push(`/post/${this.props.postId}`);
    } catch (e) {
      this.createNotification("notyours")();
      console.log(e);
    }
  };

  render() {
    const { handleGoBack, handleSubmit } = this;
    const { id } = queryString.parse(this.props.location.search);

    return (
      <>
        <EditorHeader
          onGoBack={handleGoBack}
          onSubmit={handleSubmit}
          isEdit={id ? true : false}
        />
        <NotificationContainer />
      </>
    );
  }
}

export default connect(
  state => ({
    title: state.editor.get("title"),
    markdown: state.editor.get("markdown"),
    tags: state.editor.get("tags"),
    postId: state.editor.get("postId"),
    board_no: state.editor.get("board_no")
  }),
  dispatch => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorHeaderContainer));
