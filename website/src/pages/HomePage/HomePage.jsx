import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css"
import { useLoading, useUser } from "../../hooks/contexts";
import SearchBar from "../../components/SearchBar/SearchBar";
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

function HomePage() {
  const { user } = useUser()
  const { loading } = useLoading();

  return (
    <>
      {loading ? <LoadingScreen/> : ""}
      <div className={styles.container}>
        <div className={styles.nav}>
          <Navbar/>
        </div>
        <main>
          <SearchBar/>
          <RecipesGrid/>
        </main>
      </div>;
  </>
  )
}

export default HomePage;
