import styles from "./ProfilePage.module.css";
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";
import Page from "../../components/Page/Page";
import { BASE_API_URL } from "../../utils/constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/contexts";
import { useEffect, useState } from "react";

function ProfilePage() {
  const { username } = useParams();
  const { user } = useUser();
  const [isPage, setIsPage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      setIsPage(false);
      return
    }

    if (user.username === username) {
      setIsPage(true);
    } else {
      setIsPage(false);
    }
  }, [user, location, username]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload()
    navigate("/login");
  };

  return (
    <>
      <Page>
        {isPage ? (
          <div className={styles.container}>
            <button className={styles.logout} onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          ""
        )}
        <h1 className={styles.title}>{username}'s Recipes</h1>
        <RecipesGrid
          path={`${BASE_API_URL}/recipes/${username}`}
          canEdit={isPage}
        />
      </Page>
    </>
  );
}

export default ProfilePage;
