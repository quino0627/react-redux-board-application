import React from "react";
import styles from "./SearchBar.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const SearchBar = () => {
  return (
    <div className={cx("search")}>
      <input
        type="text"
        className={cx("searchTerm")}
        placeholder="What are you looking for?"
      />
      <button type="submit" className={cx("searchButton")}>
        <div>검색</div>
      </button>
    </div>
  );
};

export default SearchBar;
