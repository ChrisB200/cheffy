import React from "react";
import styles from "./Icon.module.css"
import { useTheme } from "../../hooks/contexts";

function Icon({ lightIcon, darkIcon, alt }) {
  const { theme } = useTheme();
  return <div className={styles.container}>
    <img src={theme === "dark" ? darkIcon : lightIcon} alt={alt}/>
  </div>
}

export default Icon;
