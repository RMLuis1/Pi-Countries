import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./search.module.css";
import { getSearch } from "../redux/accion";

export function Search() {
  const dispatch = useDispatch();
  const [searchText, serSearchText] = useState("");

  const handleImput = (e) => {
    e.preventDefault();
    serSearchText(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getSearch(searchText));
    serSearchText("");
  }

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.searchBox}>
          <input
            className={styles.searchImp}
            type="text"
            placeholder="Buscar...."
            value={searchText}
            onChange={(e) => handleImput(e)}
          />
          <button
            className={styles.searchBot}
            type="submit"
            size={20}
            onClick={(e) => handleSubmit(e)}
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
