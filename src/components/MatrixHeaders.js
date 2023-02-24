import styles from "./matrixheaders.module.css";

const headers = ["Skillset", "Junior", "Mid", "Senior"];

const MatrixHeaders = () => {
  return (
    <div className={styles.matrixHeaders}>
      {headers.map((header, index) => {
        return (
          <div key={"h-" + index} className={styles.singleHeader}>
            {header}
          </div>
        );
      })}
    </div>
  );
};

export default MatrixHeaders;
