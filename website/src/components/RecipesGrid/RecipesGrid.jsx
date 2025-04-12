import React, { useEffect } from "react";
import styles from "./RecipesGrid.module.css";
import { BASE_API_URL } from "../../utils/constants";
import useFetch from "../../hooks/useFetch";
import RecipePreview from "../RecipePreview/RecipePreview";
import Action from "../Action/Action";
import Heart from "../../assets/heart.svg?react";
import Bookmark from "../../assets/bookmark.svg?react";

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
        return (
          <>
            <div className={styles.content}>
              <RecipePreview key={recipe.id} recipe={recipe} />
            </div>
          </>
        );
      })}
    </div>
  );
}

export default RecipesGrid;
