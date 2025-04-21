import styles from "./RecipePreview.module.css";
import { BASE_API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeModalSheet from "../RecipeModalSheet/RecipeModalSheet";
import { toUpper } from "../../utils/helpers";
import httpClient from "../../utils/httpClient";
import { useLoading } from "../../hooks/contexts";
import useChangeLoading from "../../hooks/useChangeLoading";

function RecipePreview({ recipe, canEdit = false }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { loading, setLoadingFalse, setLoadingTrue } = useLoading();

  const changePage = (element) => {
    const path = `/recipe/${recipe.userId}/${recipe.id}`;
    if (element === "container" && !canEdit) {
      navigate(path);
    } else if (element === "preview" && canEdit) {
      navigate(path);
    }
  };

  const handleEdit = (e) => {
    setShowModal(true);
  };

  const handleRemove = (e) => {
    setLoadingTrue();
    httpClient
      .delete(`${BASE_API_URL}/recipe/${recipe.id}`)
      .then(() => {
        alert("Successfully deleted recipe");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
      .finally(() => {
        setLoadingFalse();
      });
  };

  return (
    <>
      {showModal ? (
        <RecipeModalSheet
          setShowModal={setShowModal}
          recipe={canEdit ? recipe : null}
        />
      ) : null}
      <div className={styles.container} onClick={() => changePage("container")}>
        <div className={styles.preview} onClick={() => changePage("preview")}>
          <img src={`${BASE_API_URL}/${recipe.path}`} />
        </div>
        <div className={styles.details}>
          <p className={styles.user}>@{recipe.user.username}</p>
          <h3>{recipe.title}</h3>
          <p className={styles.cuisine}>{toUpper(recipe.cuisine.name)}</p>
          {canEdit ? (
            <>
              <button className={styles.edit} onClick={handleEdit}>
                Edit
              </button>
              <button className={styles.remove} onClick={handleRemove}>
                Remove
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default RecipePreview;
