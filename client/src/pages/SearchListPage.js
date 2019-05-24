import React from "react";
import PageTemplate from "../components/common/PageTemplate";
import ListWrapper from "../components/list/ListWrapper";
import SearchListContainer from "../containers/list/SearchListContainer";

const SearchListPage = ({ match }) => {
  const { page = 1, tag, board_no, keyword } = match.params;
  console.log(match.params);

  return (
    <PageTemplate>
      <ListWrapper>
        <SearchListContainer keyword1={keyword} />
      </ListWrapper>
    </PageTemplate>
  );
};

export default SearchListPage;
