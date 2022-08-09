import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./search.module.css";
import { getSearch } from "../redux/accion";
import { FaSearch } from "react-icons/fa";

export function Search() {
  const dispatch = useDispatch();
  const [searchText, serSearchText] = useState("");

  const handleImput = (e) => {
    e.preventDefault();
    serSearchText(e.target.value);
    dispatch(getSearch(searchText));
  };

  return (
    // <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchImp}
          type="text"
          placeholder="Search..."
          onChange={(e) => handleImput(e)}
        />
        <button className="buttom"><FaSearch /></button>
      </div>
    // </div>
  );
}
