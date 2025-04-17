import styles from "./Page.module.css";
import { useLoading, useNavbar } from "../../hooks/contexts";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import SearchBar from "../SearchBar/SearchBar";
import Navbar from "../Navbar/Navbar";

function Page({ children }) {
  const { loading, setLoadingFalse } = useLoading();
  const { isNavbarOpen, userToggleNavbar } = useNavbar();

  return (
    <>
      {loading ? <LoadingScreen /> : ""}
      <div className={styles.container}>
        <>
          <Navbar/>
          <main>
            <SearchBar/>
            <div className={styles.content}>
              {children}
            </div>
          </main>
        </>
      </div>
    </>
  );
}

export default Page;
