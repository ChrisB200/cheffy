import { compare } from "../../utils/helpers";
import styles from "./Steps.module.css";

function Steps({ steps }) {
  steps.sort(compare);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Steps</h2>
      <div className={styles.content}>
        {steps.map((step, index) => {
          let i = (index += 1);
          return (
            <>
              <p className={styles.instruction} key={index}>
                <span className={styles.index}>{i}. </span>{step.instruction}
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Steps;
