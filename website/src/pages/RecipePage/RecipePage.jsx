import React, { useEffect } from "react";
import styles from "./RecipePage.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../../utils/constants";
import RecipeDetails from "../../components/RecipeDetalis/RecipeDetails";
import Ingredients from "../../components/Ingredients/Ingredients";
import Steps from "../../components/Steps/Steps";
import { useLoading } from "../../hooks/contexts";
import Page from "../../components/Page/Page";
import axios from "axios";
import useChangeLoading from "../../hooks/useChangeLoading";

function RecipePage() {
  const { userId, recipeId } = useParams();

  const fetchRecipe = async () => {
    const { data } = await axios.get(`${BASE_API_URL}/recipe?id=${recipeId}`, {
      withCredentials: true,
    });
    return data;
  };

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["get", "recpie", recipeId],
    queryFn: fetchRecipe,
    staleTime: 60 * 1000,
  });
  useChangeLoading(isLoading);


  return (
    <Page>
      {recipe ? (
        <div className={styles.content}>
          <div className={styles.overview}>
            <div className={styles.details}>
              <RecipeDetails recipe={recipe} />
            </div>
            <hr />
            <div className={styles.imageContainer}>
              <div className={styles.image}>
                <img src={`${BASE_API_URL}/${recipe.path}`} />
              </div>
            </div>
          </div>
          <hr className={styles.seperator} />
          <div className={styles.extras}>
            <Ingredients ingredients={recipe.ingredients} />
            <Steps steps={recipe.steps} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Page>
  );
}

export default RecipePage;

