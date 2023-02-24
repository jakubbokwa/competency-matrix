import styles from "./branch.module.css";
import Level from "./Level";

const Branch = ({ name, levels, disciplineCode, branchCode, userIndex }) => {
  return (
    <div className={styles.branchContainer}>
      <div className={styles.branch}>{name}</div>
      <div className={styles.branchTopicsContainer}>
        {levels.map((level) => {
          const { levelCode, topics } = level;
          return (
            <Level
              topics={topics}
              key={levelCode}
              disciplineCode={disciplineCode}
              branchCode={branchCode}
              levelCode={levelCode}
              userIndex={userIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Branch;
