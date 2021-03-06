import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as listActions from "../../store/modules/list";
import PostList from "../../components/list/PostList";
import Pagination from "../../components/list/Pagination";
import SearchBar from "../../components/common/SearchBar";
class ListContainer extends Component {
  handleChange = e => {
    console.log("ACTIVATEd");
    const { value } = e.target;
    const { ListActions } = this.props;
    ListActions.changeInput(value);
  };

  getSearchList = () => {
    const { ListActions, keyword } = this.props;
    ListActions.getSearchList({
      keyword: keyword
    });
  };

  getPostList = () => {
    const { board_no = -1, tag, page, ListActions } = this.props;
    ListActions.getPostList({
      board_no,
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
    const {
      loading,
      posts,
      page,
      lastPage,
      tag,
      board_no = -1,
      keyword
    } = this.props;
    const { handleChange } = this;
    if (loading) return null;

    return (
      <div>
        <SearchBar keyword={keyword} onChange={handleChange} />
        <PostList posts={posts} />
        <Pagination
          page={page}
          lastPage={lastPage}
          tag={tag}
          board_no={board_no}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    lastPage: state.list.get("lastPage"),
    posts: state.list.get("posts"),
    loading: state.pender.pending["list/GET_POST_LIST"],
    keyword: state.list.get("keyword")
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(ListContainer);
