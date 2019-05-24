import React from "react";
import PageTemplate from "../components/common/PageTemplate";
import ListWrapper from "../components/list/ListWrapper";
import MessageWriteContainer from "../containers/message/MessageWriteContainer";

const MessageWritePage = ({ match }) => {
  const { page = 1, tag, board_no } = match.params;

  return (
    <PageTemplate>
      <ListWrapper>
        <MessageWriteContainer />
      </ListWrapper>
    </PageTemplate>
  );
};

export default MessageWritePage;
