import styles from "./Page.module.css";
import { useLoading } from "../../hooks/contexts";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import SearchBar from "../SearchBar/SearchBar";
import Navbar from "../Navbar/Navbar";

function Page({ children }) {
  const { loading } = useLoading();

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
