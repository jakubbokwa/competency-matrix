import styles from "./matrixheaders.module.css";
import { useModalContext } from "hooks/useModalContext";
import calculatePercentage from "utils/calculatePercentage";

const MatrixHeaders = ({ levels }) => {
  const { skillLevelRange } = useModalContext();
  const { minSkillLevel, maxSkillLevel } = skillLevelRange;
  console.log("levels: ", levels);

  return (
    <div className={styles.matrixHeaders}>
      <div className={styles.singleHeader}>
        <span>Skillset</span>
      </div>
      {levels.map((level) => {
        const { levelCode, summedSkillpoints, numberOfTopics } = level;
        return (
          <div key={levelCode} className={styles.singleHeader}>
            <span>{levelCode}</span>
            <span className={styles.counter}>
              {calculatePercentage(
                summedSkillpoints,
                numberOfTopics,
                true,
                minSkillLevel,
                maxSkillLevel
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MatrixHeaders;
