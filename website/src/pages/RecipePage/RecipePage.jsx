import React from "react";
import styles from "./RecipePage.module.css";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../../utils/constants";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/Navbar/Navbar";
import RecipeDetails from "../../components/RecipeDetalis/RecipeDetails";
import Ingredients from "../../components/Ingredients/Ingredients";
import Steps from "../../components/Steps/Steps";
import { useLoading } from "../../hooks/contexts";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

function RecipePage() {
  const { userId, recipeId } = useParams();
  const { loading } = useLoading();
  const { data: recipe, error } = useFetch({
    url: `${BASE_API_URL}/recipe?id=${recipeId}`,
    method: "get",
    withCredentials: true,
    key: ["get", "recpie", recipeId],
    cache: {
      enabled: true,
      ttl: 60,
    },
  });

  return (
    <>
      {loading ? <LoadingScreen/> : ""}
      <div className={styles.container}>
        <div className={styles.nav}>
          <Navbar />
        </div>
        {recipe ? (
          <main className={styles.content}>
            <div className={styles.overview}>
              <div className={styles.details}>
                <RecipeDetails recipe={recipe} />
              </div>
              <hr/>
              <div className={styles.imageContainer}>
                <div className={styles.image}>
                  <img src={`${BASE_API_URL}/${recipe.path}`}/>
                </div>
              </div>
            </div>
            <hr className={styles.seperator}/>
            <div className={styles.extras}>
              <Ingredients ingredients={recipe.ingredients}/>
              <Steps steps={recipe.steps}/>
            </div>
          </main>
        ) : (
            <></>
          )}
      </div>
    </>
  );
}

export default RecipePage;
