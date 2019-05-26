import React, { Component } from "react";
import MessageWrite from "../../components/message/MessageWrite";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MailBox from "../../components/message/MailBox/MailBox";

import * as messageActions from "../../store/modules/message";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class MessageWriteContainer extends Component {
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
            "존재하지 않는 유저네임입니다.",
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

  handleChange = ({ name, value }) => {
    const { MessageListActions } = this.props;
    console.log(name, value);
    MessageListActions.changeInput({ name, value });
  };

  handleUpload = async () => {
    const {
      MessageListActions,
      receiver_username,
      message_content
    } = this.props;
    console.log(MessageListActions, receiver_username, message_content);
    try {
      const result = await MessageListActions.sendMessage({
        message_content: message_content,
        receiver_username: receiver_username
      });
      console.log(result);
      window.location.reload();
    } catch (e) {
      console.log(e);
      this.createNotification("warning")();
    }
  };

  render() {
    const { handleChange, handleUpload } = this;
    const { loading, receiver_username, message_content } = this.props;

    if (loading) return null;

    return (
      <>
        <MessageWrite
          receiver_username={receiver_username}
          message_content={message_content}
          onChange={handleChange}
          onUpload={handleUpload}
        />
        <NotificationContainer />
      </>
    );
  }
}

export default connect(
  state => ({
    messages: state.message.get("messages"),
    loading: state.pender.pending["message/GET_MESSAGE_LIST"],
    receiver_username: state.message.get("receiver_username"),
    message_content: state.message.get("message_content")
  }),
  dispatch => ({
    MessageListActions: bindActionCreators(messageActions, dispatch)
  })
)(MessageWriteContainer);
