import React, { useState } from "react";
import styles from "./RecipeDetails.module.css";
import Star from "../../assets/star.svg?react";
import Cook from "../../assets/cook.svg?react";
import Clock from "../../assets/clock.svg?react";
import Bookmark from "../../assets/bookmark.svg?react";
import BookmarkFilled from "../../assets/bookmark-fill.svg?react"
import Heart from "../../assets/heart.svg?react";
import { convertTime } from "../../utils/helpers";
import StarRating from "../StarRating/StarRating";
import httpClient from "../../utils/httpClient";

function RecipeDetails({ recipe }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleBookmarkClicked = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.user}>@{recipe.user.username}</button>
        <h1 className={styles.title}>{recipe.title}</h1>
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
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.bookmark}`}>
            <Bookmark className={styles.icon} />
            <p>Bookmark</p>
          </button>
        </div>
        <StarRating recipe={recipe} />
      </div>
    </div>
  );
}

export default RecipeDetails;
