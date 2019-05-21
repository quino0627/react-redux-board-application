import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as listActions from "../../store/modules/list";
import PostList from "../../components/list/PostList";
import Pagination from "../../components/list/Pagination";
class ListContainer extends Component {
  getPostList = () => {
    const { tag, page, ListActions } = this.props;
    ListActions.getPostList({
      page,
      tag
    });
  };

  componentDidMount() {
    this.getPostList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.page !== this.props.page ||
      prevProps.tag !== this.props.tag
    ) {
      this.getPostList();
      document.documentElement.scrollTop = 0;
    }
  }

  render() {
    console.log(this.props);
    const { loading, posts, page, lastPage, tag } = this.props;
    console.log(posts);
    if (loading) return null;

    return (
      <div>
        <PostList posts={posts} />
        <Pagination page={page} lastPage={lastPage} tag={tag} />
      </div>
    );
  }
}

export default connect(
  state => ({
    lastPage: state.list.get("lastPage"),
    posts: state.list.get("posts"),
    loading: state.pender.pending["list/GET_POST_LIST"]
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(ListContainer);
