import React from "react";
import PageTemplate from "../components/common/PageTemplate";
import ListWrapper from "../components/list/ListWrapper";
import MailBoxContainer from "../containers/message/MailBoxContainer";

const MailBoxPage = ({ match }) => {
  const { page = 1, tag, board_no } = match.params;

  return (
    <PageTemplate>
      <ListWrapper>
        <MailBoxContainer />
      </ListWrapper>
    </PageTemplate>
  );
};

export default MailBoxPage;
