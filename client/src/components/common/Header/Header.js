import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "../Button";

const cx = classNames.bind(styles);

const Header = ({ postId, logged, onRemove, location }) => {
  console.log(location);
  const tmp = location.pathname.split("/")[2];
  console.log(tmp);
  return (
    <header className={cx("header")}>
      <div className={cx("header-content")}>
        <div className={cx("brand")}>
          <Link to="/">MongLog</Link>
        </div>
        <div className={cx("board")}>
          <a
            className={cx("router", tmp === undefined ? "selected" : "")}
            href="/"
          >
            ALL
          </a>
          <a
            className={cx("router", tmp === "1" ? "selected" : "")}
            href="/board/1"
          >
            CN
          </a>
          <a
            className={cx("router", tmp === "3" ? "selected" : "")}
            href="/board/3"
          >
            DB
          </a>
          <a
            className={cx("router", tmp === "4" ? "selected" : "")}
            href="/board/4"
          >
            잡담
          </a>
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
            <Button theme="outline" to="/editor">
              새 포스트
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
