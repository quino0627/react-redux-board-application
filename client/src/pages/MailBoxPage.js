import React from "react";
import PageTemplate from "../components/common/PageTemplate";
import ListWrapper from "../components/list/ListWrapper";
import ListContainer from "../containers/list/ListContainer";

const MailBoxPage = ({ match }) => {
  const { page = 1, tag, board_no } = match.params;

  return (
    <PageTemplate>
      <ListWrapper>MailBoxPage</ListWrapper>
    </PageTemplate>
  );
};

export default MailBoxPage;
