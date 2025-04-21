import styles from "./SearchPreview.module.css"
import { BASE_API_URL } from "../../utils/constants"
import { useNavigate } from "react-router-dom";

function SearchPreview({ recipe }) {
  const navigate = useNavigate();

  const changePage = () => {
    const path = `/recipe/${recipe.userId}/${recipe.id}`
    navigate(path)
  }

  return <div className={styles.container} onClick={changePage}>
    <div className={styles.image}>
      <img src={`${BASE_API_URL}/uploads/${recipe.path}`} alt={recipe.title}/>
    </div>
    <div className={styles.details}>
      <p className={styles.title}>{recipe.title}</p>
      <p className={styles.cuisine}>{recipe.cuisine.name}</p>
      <p className={styles.username}>{recipe.user.username}</p>
    </div>
  </div>
}

export default SearchPreview;
