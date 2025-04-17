import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import Search from "../../assets/search.svg?react";
import useFetch from "../../hooks/useFetch";
import { BASE_API_URL } from "../../utils/constants";
import SearchPreview from "../SearchPreview/SearchPreview";

function SearchBar() {
  const [search, setSearch] = useState("");
  const { data: recipes, refetch } = useFetch({
    url: `${BASE_API_URL}/recipe/search?search=${search}`,
    method: "get",
    withCredentials: true,
    key: ["search", "recipe", search],
    cache: {
      enabled: true,
      ttl: 120,
    },
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search !== "") {
      refetch();
    } 
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          className={styles.input}
          type="search"
          value={search}
          onChange={handleChange}
        />
        <div className={styles.recipes}>
          {recipes && search !== ""
            ? recipes.map((recipe) => (
              <SearchPreview key={recipe.id} recipe={recipe} />
            ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
