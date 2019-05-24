import React from "react";
import styles from "./SearchBar.scss";
import classNames from "classnames/bind";
import Button from "../../../components/common/Button";
const cx = classNames.bind(styles);

const SearchBar = ({ keyword, onChange }) => {
  return (
    <div className={cx("search")}>
      <input
        type="text"
        className={cx("searchTerm")}
        placeholder="What are you looking for?"
        value={keyword}
        onChange={onChange}
      />
      <Button
        type="submit"
        className={cx("searchButton")}
        to={"/search/" + keyword}
      >
        검색
      </Button>
    </div>
  );
};

export default SearchBar;
