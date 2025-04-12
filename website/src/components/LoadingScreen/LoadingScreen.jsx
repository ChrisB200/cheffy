import styles from "./LoadingScreen.module.css";
import { SyncLoader } from "react-spinners";

function LoadingScreen() {
  const accent = window.getComputedStyle(document.body).getPropertyValue("--accent")
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <SyncLoader
        loading={true}
        color={accent}
        className={styles.spinner}
      />
    </div>
  );
}

export default LoadingScreen;
