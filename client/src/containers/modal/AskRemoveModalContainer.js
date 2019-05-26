import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "../../store/modules/base";
import * as postActions from "../../store/modules/post";
import AskRemoveModal from "../../components/modal/AskRemoveModal";
import { withRouter } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class AskRemoveModalContainer extends Component {
  createNotification = type => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Success message", "Title here");
          break;
        case "warning":
          NotificationManager.warning(
            "당신의 게시물이 아닙니다",
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

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("remove");
  };

  handleConfirm = async () => {
    const { BaseActions, PostActions, history, match } = this.props;
    const { id } = match.params;

    try {
      // 포스트 삭제 후, 모달 닫고 홈페이지로 이동
      console.log("IM IN!");
      await PostActions.removePost(id);
      BaseActions.hideModal("remove");
      history.push("/");
    } catch (e) {
      console.log(e);
      this.createNotification("warning")();
    }
  };

  render() {
    const { visible } = this.props;
    const { handleCancel, handleConfirm } = this;

    return (
      <>
        <AskRemoveModal
          visible={visible}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
        <NotificationContainer />
      </>
    );
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(["modal", "remove"])
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(withRouter(AskRemoveModalContainer));
