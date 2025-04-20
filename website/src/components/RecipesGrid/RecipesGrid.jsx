import React from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./RecipesGrid.module.css";
import { BASE_API_URL } from "../../utils/constants";
import RecipePreview from "../RecipePreview/RecipePreview";
import axios from "axios";
import useChangeLoading from "../../hooks/useChangeLoading";

function RecipesGrid() {
  const fetchRecipes = async () => {
    const { data } = await axios.get(`${BASE_API_URL}/recipes`, {
      withCredentials: true,
    });
    return data;
  };

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["get", "recipies"],
    queryFn: fetchRecipes,
    staleTime: 60 * 1000,
  });
  useChangeLoading(isLoading);


  return (
    <div className={styles.container}>
      {recipes?.map((recipe) => {
        return (
          <RecipePreview key={recipe.id} recipe={recipe} />
        );
      })}
    </div>
  );
}

export default RecipesGrid;

