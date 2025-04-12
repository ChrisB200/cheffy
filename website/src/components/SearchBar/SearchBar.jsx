import React from "react";
import styles from "./SearchBar.module.css"
import Search from "../../assets/search.svg?react"

function SearchBar() {
  return <div className={styles.container}>
    <div className={styles.icon}>
      <Search/>
    </div>
    <input className={styles.search} type="search"/>
  </div>
}

export default SearchBar;
