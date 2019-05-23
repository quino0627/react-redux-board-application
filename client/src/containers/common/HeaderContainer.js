import React, { Component } from "react";
import Header from "../../components/common/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "../../store/modules/base";
import api from "../../lib/api";
class HeaderContainer extends Component {
  componentDidMount() {}

  handleRemove = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal("remove");
  };

  render() {
    const { handleRemove } = this;
    const { match, logged, location } = this.props;

    const { id } = match.params;

    return (
      <Header
        postId={id}
        logged={logged}
        onRemove={handleRemove}
        location={location}
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
)(withRouter(HeaderContainer));
