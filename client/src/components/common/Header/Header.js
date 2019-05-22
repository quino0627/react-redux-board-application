import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "../Button";

const cx = classNames.bind(styles);

const Header = ({ postId, logged, onRemove }) => {
  return (
    <header className={cx("header")}>
      <div className={cx("header-content")}>
        <div className={cx("brand")}>
          <Link to="/">DBASSIGNMENT</Link>
        </div>
        {logged ? (
          <div className={cx("right")}>
            {postId && [
              <Button key="edit" theme="outline" to={`/editor?id=${postId}`}>
                수정
              </Button>,
              <Button key="remove" theme="outline" onClick={onRemove}>
                삭제
              </Button>
            ]}
            <Button theme="outline" to="./editor">
              새 포스트
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
