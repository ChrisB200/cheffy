import React from "react";
import add from "../../assets/add.png";
import bookmark from "../../assets/bookmark.png";
import home from "../../assets/home.png";
import cheffyLogo from "../../assets/cheffy-logo-256x256.png";
import styles from "./Navbar.module.css"
import { Link, useLocation } from "react-router-dom";
import { FormControlLabel, Switch } from "@mui/material";

function Navbar() {
  const location = useLocation()

  const isActive = (name) => {
    if (location.pathname == name) {
      return styles.active
    }
  }

  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <img src={cheffyLogo} alt="Cheffy" />
      </div>
      <ul>
        <li>
          <Link to="/" className={`${isActive("/")} ${styles.control}`}>
            <div className={styles.icon}>
              <img src={home} alt="" />
            </div>
            <p>My Feed</p>
          </Link>
        </li>
        <li>
          <Link to="/bookmarks" className={`${isActive("/bookmarks")} ${styles.control}`}>
            <div className={styles.icon}>
              <img src={bookmark} alt="" />
            </div>
            <p>Bookmarks</p>
          </Link>
        </li>
        <li>
          <button className={styles.control}>
            <div className={styles.icon}>
              <img src={add} alt="" />
            </div>
            <p>Add Recipe</p>
          </button>
        </li>
      </ul>
      <div className={styles.navBottom}>
        <Link className={styles.profile} to="/profile">My Profile</Link>
        <FormControlLabel control={<Switch />} label="Dark Mode" />
      </div>
    </nav>
  );
}

export default Navbar;
