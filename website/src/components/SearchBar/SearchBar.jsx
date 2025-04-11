import React from "react";
import styles from "./SearchBar.module.css"
import searchLight from "../../assets/searchLight.png"
import searchDark from "../../assets/searchDark.png"
import Icon from "../Icon/Icon";

function SearchBar() {
  return <div className={styles.container}>
    <div className={styles.icon}>
      <Icon lightIcon={searchLight} darkIcon={searchDark}/>
    </div>
    <input className={styles.search} type="search"/>
  </div>
}

export default SearchBar;
