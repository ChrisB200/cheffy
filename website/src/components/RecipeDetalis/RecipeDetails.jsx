import React, { useEffect, useState } from "react";
import styles from "./RecipeDetails.module.css";
import Star from "../../assets/star.svg?react";
import Cook from "../../assets/cook.svg?react";
import Clock from "../../assets/clock.svg?react";
import Bookmark from "../../assets/bookmark.svg?react";
import BookmarkFilled from "../../assets/bookmark-fill.svg?react";
import Heart from "../../assets/heart.svg?react";
import { convertTime } from "../../utils/helpers";
import StarRating from "../StarRating/StarRating";
import httpClient from "../../utils/httpClient";
import { BASE_API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useLoading, useUser } from "../../hooks/contexts";
import useFetch from "../../hooks/useFetch";

function RecipeDetails({ recipe }) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useUser();
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const { data: bookmark } = useFetch({
    url: `${BASE_API_URL}/recipe/bookmark/${recipe.id}`,
    method: "get",
    withCredentials: true,
    key: ["get", "recipe", "bookmarked", user?.id],
    cache: {
      enabled: true,
      ttl: 60,
    },
  });

  const handleBookmarkClicked = (e) => {
    e.preventDefault();
    if (isBookmarked) {
      setLoadingTrue()
      httpClient
        .delete(`${BASE_API_URL}/recipe/bookmark?id=${recipe.id}`)
        .then(() => {
          setIsBookmarked(false);
        })
        .catch((error) => {
          if (error.status === 401) {
            alert("You must be logged in to bookmark a post");
            navigate("/login");
          }
        })

      .finally(() => {
          setLoadingFalse()
        })
    } else {
      setLoadingTrue()
      httpClient
        .post(`${BASE_API_URL}/recipe/bookmark?id=${recipe.id}`)
        .then(() => {
          setIsBookmarked(true);
        })
        .catch((error) => {
          if (error.status === 401) {
            alert("You must be logged in to bookmark a post");
          }
        })
      .finally(() => {
          setLoadingFalse()
        })
    }
  };

  useEffect(() => {
    setIsBookmarked(bookmark?.bookmark ? bookmark.bookmark : false)
  }, [bookmark])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.user}>@{recipe.user.username}</button>
        <div className={styles.group}>
          <p className={styles.cuisine}>{recipe.cuisine.name}</p>
          <h1 className={styles.title}>{recipe.title}</h1>
        </div>
        <div className={styles.info}>
          <div>
            <Star className={styles.icon} />
            <p>
              {!parseFloat(recipe.averageRating)
                ? "No Ratings"
                : parseFloat(recipe.averageRating)}
            </p>
            <hr />
          </div>
          <hr />
          <div>
            <Clock className={styles.icon} />
            <p>{convertTime(recipe.prep)}</p>
            <hr />
          </div>
          <hr />
          <div>
            <Cook className={styles.icon} />
            <p>{convertTime(recipe.cook)}</p>
          </div>
        </div>
        <StarRating recipe={recipe} />
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.bookmark}`} onClick={handleBookmarkClicked}>
            {isBookmarked ?
              <Bookmark className={styles.icon} /> : <BookmarkFilled className={styles.icon}/>
            }
            <p>Bookmark</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
