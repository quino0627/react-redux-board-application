import React from "react";
import PageTemplate from "../components/common/PageTemplate";
import ListWrapper from "../components/list/ListWrapper";
import ListContainer from "../containers/list/ListContainer";

const MessageWritePage = ({ match }) => {
  const { page = 1, tag, board_no } = match.params;

  return (
    <PageTemplate>
      <ListWrapper>MessageWritePage</ListWrapper>
    </PageTemplate>
  );
};

export default MessageWritePage;
