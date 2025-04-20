import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./SearchBar.module.css";
import Search from "../../assets/search.svg?react";
import { BASE_API_URL } from "../../utils/constants";
import SearchPreview from "../SearchPreview/SearchPreview";
import axios from "axios";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [enabled, setEnabled] = useState(false);

  const fetchRecipes = async () => {
    const { data } = await axios.get(
      `${BASE_API_URL}/recipe/search?search=${search}`,
      { withCredentials: true }
    );
    return data;
  };

  const {
    data: recipes,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["search", "recipe", search],
    queryFn: fetchRecipes,
    enabled,
    staleTime: 120 * 1000, 
    cacheTime: 5 * 60 * 1000, 
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() !== "") {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  };

  useEffect(() => {
    if (enabled) {
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
          placeholder="Search"
        />
        <div className={styles.recipes}>
          {recipes && search !== ""
            ? recipes.map((recipe) => (
                <SearchPreview key={recipe.id} recipe={recipe} />
              ))
            : ""}
          {isFetching && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

