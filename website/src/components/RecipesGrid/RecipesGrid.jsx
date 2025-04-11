import React, { useEffect } from "react";
import styles from "./RecipesGrid.module.css";
import { BASE_API_URL } from "../../utils/constants";
import useFetch from "../../hooks/useFetch";
import RecipePreview from "../RecipePreview/RecipePreview";

function RecipesGrid() {
  const { data: recipes, error } = useFetch({
    url: `${BASE_API_URL}/recipes`,
    method: "get",
    withCredentials: true,
    key: ["get", "recpies"],
    cache: {
      enabled: true,
      ttl: 60,
    },
  });

  return (
    <div className={styles.container}>
      {recipes?.map((recipe) => {
        return <RecipePreview key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
}

export default RecipesGrid;
