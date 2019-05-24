import React from "react";
import styles from "./Pagination.scss";
import classNames from "classnames/bind";
import Button from "../../common/Button";

const cx = classNames.bind(styles);

const Pagination = ({ page, lastPage, tag, board_no }) => {
  const createPagePath = page => {
    return tag
      ? `/tag/${tag}/${page}`
      : board_no === -1
      ? `/page/${page}`
      : `/board/${board_no}/${page}`;
  };
  return (
    <div className={cx("pagination")}>
      <Button disabled={page === 1} to={createPagePath(page - 1)}>
        이전 페이지
      </Button>
      <div className={cx("number")}>페이지 {page}</div>
      <Button disabled={page === lastPage} to={createPagePath(page + 1)}>
        다음 페이지
      </Button>
    </div>
  );
};

export default Pagination;
