import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as listActions from "../../store/modules/list";
import PostList from "../../components/list/PostList";
import Pagination from "../../components/list/Pagination";
import SearchBar from "../../components/common/SearchBar";
class SearchListContainer extends Component {
  handleChange = e => {
    console.log("ACTIVATEd");
    const { value } = e.target;
    const { ListActions } = this.props;
    ListActions.changeInput(value);
  };

  getSearchList = () => {
    const { ListActions, keyword1 } = this.props;
    console.log(this.props);
    ListActions.getSearchList({
      keyword: keyword1
    });
  };

  componentDidMount() {
    this.getSearchList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.keyword1 !== this.props.keyword1) {
      this.getSearchList();
      document.documentElement.scrollTop = 0;
    }
  }

  render() {
    const { loading, posts, keyword, keyword1 } = this.props;
    const { handleChange } = this;
    if (loading) return null;

    return (
      <div>
        <h3>"{keyword1}"에 대한 검색 결과</h3>
        <SearchBar keyword={keyword} onChange={handleChange} />
        <PostList posts={posts} />
      </div>
    );
  }
}

export default connect(
  state => ({
    posts: state.list.get("posts"),
    loading: state.pender.pending["list/GET_SEARCH_LIST"],
    keyword: state.list.get("keyword")
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(SearchListContainer);
