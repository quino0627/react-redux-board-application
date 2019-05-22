import React, { Component } from "react";
import LoginModal from "../../components/modal/LoginModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "../../store/modules/base";

class LoginModalContainer extends Component {
  handleLogin = async () => {
    const { BaseActions, username, password } = this.props;
    try {
      // 로그인 시도, 성공 시 모달 닫기
      const result = await BaseActions.login(username, password);
      console.log(result);
      BaseActions.hideModal("login");
    } catch (e) {
      console.log(e);
    }
  };
  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("login");
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
      this.handleLogin();
    }
  };
  render() {
    const {
      handleLogin,
      handleCancel,
      handleUsernameChange,
      handlePasswordChange,
      handleKeyPress
    } = this;
    const { visible, error, password, username } = this.props;

    return (
      <LoginModal
        onLogin={handleLogin}
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
    visible: state.base.getIn(["modal", "login"]),
    username: state.base.getIn(["loginModal", "username"]),
    password: state.base.getIn(["loginModal", "password"]),
    error: state.base.getIn(["loginModal", "error"])
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(LoginModalContainer);
