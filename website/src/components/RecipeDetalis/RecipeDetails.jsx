import React from "react";
import styles from "./RecipeDetails.module.css";
import Star from "../../assets/star.svg?react";
import Cook from "../../assets/cook.svg?react";
import Clock from "../../assets/clock.svg?react";
import Bookmark from "../../assets/bookmark.svg?react";
import Heart from "../../assets/heart.svg?react";
import { convertTime } from "../../utils/helpers";

function RecipeDetails({ recipe }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.user}>@{recipe.user.username}</button>
        <h1 className={styles.title}>{recipe.title}</h1>
        <div className={styles.info}>
          <div>
            <Star className={styles.icon}/>
            <p>1</p>
            <hr />
          </div>
          <hr/>
          <div>
            <Clock className={styles.icon}/>
            <p>{convertTime(recipe.prep)}</p>
            <hr />
          </div>
          <hr/>
          <div>
            <Cook className={styles.icon}/>
            <p>{convertTime(recipe.cook)}</p>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.bookmark}`}>
            <Bookmark className={styles.icon}/>
            <p>Bookmark</p>
          </button>
          <button className={`${styles.button} ${styles.like}`}>
            <Heart className={styles.icon}/>
            <p>Like</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
