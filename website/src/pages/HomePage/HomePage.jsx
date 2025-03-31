import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css"
import RecipeModalSheet from "../../components/RecipeModalSheet/RecipeModalSheet";

function HomePage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {showModal ? <RecipeModalSheet setShowModal={setShowModal}/> : null}
      <div className={styles.container}>
        <Navbar setShowModal={setShowModal}/>
      </div>;
  </>
  )
}

export default HomePage;
