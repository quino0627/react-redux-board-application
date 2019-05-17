import React from "react";
import styles from "../PageTemplate/PageTemplate.scss";
import classNames from "classnames/bind";
import Header from "../Header";
import Footer from "../Footer";

const cx = classNames.bind(styles);

const PageTemplate = () => {
  return (
    <div className={cx("page-template")}>
      <Header />
      <Footer />
    </div>
  );
};

export default PageTemplate;
