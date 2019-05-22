import React from "react";
import styles from "./Footer.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Footer = ({ onLoginClick, logged }) => {
  return (
    <footer className={"footer"}>
      <Link to="/" className={cx("brand")}>
        DBASSIGNMENTBLOG
      </Link>
      <div onClick={onLoginClick} className={cx("admin-login")}>
        {logged ? "로그아웃" : "로그링"}
      </div>
    </footer>
  );
};

export default Footer;
