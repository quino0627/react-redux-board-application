import React from "react";
import styles from "./Footer.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={"footer"}>
      <Link to="/" className={cx("brand")}>
        DBASSIGNMENTBLOG
      </Link>
      <div className={cx("admin-login")}>로그링</div>
    </footer>
  );
};

export default Footer;
