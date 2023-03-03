import styles from "./branch.module.css";
import Level from "./Level";
import MatrixHeaders from "./MatrixHeaders";

const Branch = ({ name, levels, disciplineCode, branchCode, userIndex }) => {
  const levelsWithSummedSkillpoints = levels.map((level) => {
    const { topics, levelCode } = level;

    const summedSkillpoints = topics
      .map((topic) => {
        return topic.skillLevel;
      })
      .reduce((partialSum, nextItem) => {
        return partialSum + nextItem;
      }, 0);

    return {
      levelCode,
      summedSkillpoints,
      numberOfTopics: topics.length,
    };
  });

  return (
    <div>
      <MatrixHeaders levels={levelsWithSummedSkillpoints} />
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
    </div>
  );
};

export default Branch;
