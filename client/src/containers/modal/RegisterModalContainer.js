import React, { Component } from "react";
import RegisterModal from "../../components/modal/RegisterModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "../../store/modules/base";

class RegisterModalContainer extends Component {
  handleRegister = async () => {
    const { BaseActions, username, password } = this.props;
    try {
      // 로그인 시도, 성공 시 모달 닫기
      const result = await BaseActions.register(username, password);
      console.log(result);
      BaseActions.hideModal("register");
    } catch (e) {
      console.log(e);
    }
  };
  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("register");
  };
  handleUsernameChange = e => {
    const { value } = e.target;
    const { BaseActions } = this.props;
    BaseActions.changeUsernameInput(value);
  };
  handlePasswordChange = e => {
    const { value } = e.target;
    const { BaseActions } = this.props;
    BaseActions.changePasswordInput(value);
  };
  handleKeyPress = e => {
    // 엔터키가 눌리면 로그인 호출
    if (e.key === "Enter") {
      console.log("ENTER");
      this.handleRegister();
    }
  };
  render() {
    const {
      handleRegister,
      handleCancel,
      handleUsernameChange,
      handlePasswordChange,
      handleKeyPress
    } = this;
    const { visible, error, password, username } = this.props;

    return (
      <RegisterModal
        onRegister={handleRegister}
        onCancel={handleCancel}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
        onKeyPress={handleKeyPress}
        visible={visible}
        error={error}
        password={password}
        username={username}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(["modal", "register"]),
    username: state.base.getIn(["loginModal", "username"]),
    password: state.base.getIn(["loginModal", "password"]),
    error: state.base.getIn(["registerModal", "error"])
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(RegisterModalContainer);
