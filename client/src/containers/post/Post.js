import React, { Component } from "react";
import PostInfo from "../../components/post/PostInfo";
import PostBody from "../../components/post/PostBody";
import * as postActions from "../../store/modules/post";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { async } from "rxjs/internal/scheduler/async";

class Post extends Component {
  initialize = async () => {
    const { PostActions, id } = this.props;
    try {
      await PostActions.getPost(id);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
  }

  getValueByKey(object, key) {
    return Object.values(object).find(value => object[key] === value);
  }

  render() {
    const { loading, post } = this.props;

    if (loading) return null;
    console.log("THIS IS POST CONTAINER");
    const {
      post_title,
      post_no,
      post_content,
      created_at,
      writer,
      tags
    } = post;

    return (
      <div>
        <PostInfo
          title={post_title}
          publishedDate={created_at}
          tags={tags}
          writer={writer}
        />
        <PostBody body={post_content} />
      </div>
    );
  }
}

export default connect(
  state => ({
    post: state.post.get("post"),
    loading: state.pender.pending["post/GET_POST"]
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(Post);
