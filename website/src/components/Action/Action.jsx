import styles from "./Action.module.css";

function Action({ icon, iconFilled, request, onClick }) {
  return <button className={styles.container}>
      {icon}
  </button>
}

export default Action;
