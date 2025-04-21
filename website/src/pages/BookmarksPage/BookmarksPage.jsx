import styles from "./BookmarksPage.module.css"
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";
import Page from "../../components/Page/Page";
import { BASE_API_URL } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/contexts";

function BookmarksPage() {
  const { user } = useUser();
  
  return (
    <>
      <Page>
        <h1 className={styles.title}>My Bookmarks</h1>
        <RecipesGrid path={`${BASE_API_URL}/bookmarks/recipes`}/>
      </Page>
    </>
  );
}

export default BookmarksPage;
