import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css"
import { useUser } from "../../hooks/contexts";
import SearchBar from "../../components/SearchBar/SearchBar";
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";

function HomePage() {
  const { user } = useUser()

  return (
    <>
      <div className={styles.container}>
        <Navbar/>
        <main>
          <SearchBar/>
          <RecipesGrid/>
        </main>
      </div>;
  </>
  )
}

export default HomePage;
