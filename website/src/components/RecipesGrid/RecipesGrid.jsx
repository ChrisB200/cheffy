import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./RecipesGrid.module.css";
import RecipePreview from "../RecipePreview/RecipePreview";
import useChangeLoading from "../../hooks/useChangeLoading";
import { useLocation } from "react-router-dom";
import httpClient from "../../utils/httpClient";

function RecipesGrid({ path, canEdit=false }) {
  const location = useLocation();

  const fetchRecipes = async () => {
    const { data } = await httpClient.get(path, {
      withCredentials: true,
    });
    return data;
  };

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["get", "recipies", location.pathname],
    queryFn: fetchRecipes,
    staleTime: 60 * 1000,
  });
  useChangeLoading(isLoading);

  return (
    <div className={styles.container}>
      {recipes?.map((recipe) => {
        return (
          <RecipePreview key={recipe.id} recipe={recipe} canEdit={canEdit} />
        );
      })}
    </div>
  );
}

export default RecipesGrid;

