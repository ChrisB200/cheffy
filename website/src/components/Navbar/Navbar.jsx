import React, { useEffect, useState } from "react";
import cheffyLogo from "../../assets/cheffy-logo-256x256.png";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { FormControlLabel, Switch } from "@mui/material";
import { useNavbar, useTheme, useUser } from "../../hooks/contexts";
import RecipeModalSheet from "../RecipeModalSheet/RecipeModalSheet";
import Bookmark from "../../assets/bookmark-fill.svg?react";
import Add from "../../assets/add.svg?react";
import Home from "../../assets/home.svg?react";
import Burger from "../../assets/burger-menu.svg?react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function Navbar() {
  const location = useLocation();
  const { user } = useUser();
  const { theme, setTheme, increaseFontSize, decreaseFontSize, resetFontSize } =
    useTheme();
  const { isNavbarOpen, userToggleNavbar } = useNavbar();
  const [checked, setChecked] = useState(theme === "dark" ? true : false);
  const [showModal, setShowModal] = useState(false);
  const { width } = useWindowDimensions();

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  const isActive = (name) => {
    if (location.pathname == name) {
      return styles.active;
    }
  };

  const openModal = () => {
    if (user) {
      setShowModal(true);
    } else {
      alert("You must be logged in to create a post");
    }
  };

  useEffect(() => {
    setChecked(theme === "dark" ? true : false);
  }, [theme]);

  useEffect(() => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [checked]);

  return (
    <>
      {showModal ? <RecipeModalSheet setShowModal={setShowModal} /> : null}
      {width <= 768 && isNavbarOpen ? (
        <div
          className={styles.background}
          onClick={userToggleNavbar}
        ></div>
      ) : (
          <></>
        )}
      <nav
        className={`${styles.container} ${isNavbarOpen ? styles.expanded : styles.collapsed}`}
      >
        {isNavbarOpen ? (
          <>
            <div className={styles.burger} onClick={userToggleNavbar}>
              <Burger />
            </div>
            <Link to="/">
              <div className={styles.logo}>
                <img src={cheffyLogo} alt="Cheffy" />
              </div>
            </Link>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link to="/" className={`${isActive("/")} ${styles.control}`}>
                  <div className={styles.icon}>
                    <Home />
                  </div>
                  <p>My Feed</p>
                </Link>
              </li>
              <li className={styles.item}>
                <Link
                  to="/bookmarks"
                  className={`${isActive("/bookmarks")} ${styles.control}`}
                >
                  <div className={styles.icon}>
                    <Bookmark />
                  </div>
                  <p>Bookmarks</p>
                </Link>
              </li>
              <li className={styles.item}>
                <button className={styles.control} onClick={openModal}>
                  <div className={styles.icon}>
                    <Add />
                  </div>
                  <p>Add Recipe</p>
                </button>
              </li>
              <li className={styles.item}>
                {user ? (
                  <Link className={styles.profile} to="/profile">
                    My Profile
                  </Link>
                ) : (
                  <Link className={styles.profile} to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
            <div className={styles.navBottom}>
              <div className={styles.sizes}>
                <button onClick={decreaseFontSize} className={styles.size}>
                  A-
                </button>
                <button onClick={resetFontSize} className={styles.size}>
                  R
                </button>
                <button onClick={increaseFontSize} className={styles.size}>
                  A+
                </button>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleCheck}
                    checked={checked}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "var(--accent)", // Set the accent color when the switch is checked (on)
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "var(--accent)", // Change the track background when checked
                        },
                    }}
                  />
                }
                label="Dark Mode"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontFamily: "Lexend, sans-serif",
                    color: "var(--text)",
                  },
                }}
              />
            </div>
          </>
        ) : (
          <div className={styles.burger} onClick={userToggleNavbar}>
            <Burger />
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
