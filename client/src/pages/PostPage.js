import React from "react";
import PageTemplate from "../components/common/PageTemplate";
import PostInfo from "../components/post/PostInfo";
import PostBody from "../components/post/PostBody";
import Post from "../containers/post/Post";
import AskRemoveModalContainer from "../containers/modal/AskRemoveModalContainer";

const PostPage = ({ match }) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <Post id={id} />
      <AskRemoveModalContainer />
    </PageTemplate>
  );
};

export default PostPage;
