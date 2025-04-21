import styles from "./HomePage.module.css"
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";
import Page from "../../components/Page/Page";
import { BASE_API_URL } from "../../utils/constants";

function HomePage() {
  return (
    <>
      <Page>
        <h1 className={styles.title}>My Feed</h1>
        <RecipesGrid path={`${BASE_API_URL}/recipes`}/>
      </Page>
    </>
  );
}

export default HomePage;
