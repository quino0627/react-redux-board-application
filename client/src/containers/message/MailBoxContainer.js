import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MailBox from "../../components/message/MailBox/MailBox";

import * as messageActions from "../../store/modules/message";

class MailBoxContainer extends Component {
  getMessageList = async () => {
    const { MessageListActions } = this.props;
    try {
      await MessageListActions.getMessageList();
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getMessageList();
  }

  render() {
    const { loading, messages } = this.props;
    console.log(messages);
    if (loading) return null;

    return <MailBox messages={messages} />;
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
)(MailBoxContainer);
