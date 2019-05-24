import React, { Component } from "react";
import Footer from "../../components/common/Footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "../../store/modules/base";

class FooterContainer extends Component {
  handleLoginClick = async () => {
    const { BaseActions, logged } = this.props;
    if (logged) {
      try {
        await BaseActions.logout();
        window.location.href = "/"; // 페이지 새로고침
      } catch (e) {
        console.log(e);
      }
      return;
    }
    BaseActions.showModal("login");
    BaseActions.initializeLoginModal();
  };

  handleRegisterClick = async () => {
    const { BaseActions } = this.props;

    BaseActions.showModal("register");
    BaseActions.initializeRegisterModal();
  };
  render() {
    const { handleLoginClick, handleRegisterClick } = this;
    const { logged } = this.props;

    return (
      <Footer
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        logged={logged}
      />
    );
  }
}

export default connect(
  state => ({
    logged: state.base.get("logged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(FooterContainer);
