import styles from "./discipline.module.css";
import Branch from "./Branch";
import MatrixHeaders from "./MatrixHeaders";

const Discipline = ({ name, branches, disciplineCode, userIndex }) => {
  return (
    <section className={styles.disciplineContainer}>
      <div className={styles.discipline}>{name}</div>
      {branches.map((branch) => {
        const { branchId, branchName, levels, branchCode } = branch;
        return (
          <Branch
            key={branchId}
            name={branchName}
            levels={levels}
            disciplineCode={disciplineCode}
            branchCode={branchCode}
            userIndex={userIndex}
          />
        );
      })}
    </section>
  );
};

export default Discipline;
