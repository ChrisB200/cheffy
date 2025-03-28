import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css"

function HomePage() {
  return <div className={styles.container}>
    <Navbar/>
  </div>;
}

export default HomePage;
