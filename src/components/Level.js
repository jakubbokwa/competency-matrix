import styles from "./level.module.css";
import Topic from "./Topic";

const Level = ({
  topics,
  disciplineCode,
  branchCode,
  levelCode,
  userIndex,
}) => {
  return (
    <div className={styles.level}>
      {topics.map((topic) => {
        const { topicCode, topicName, topicId, skillLevel, topicDescription } =
          topic;
        return (
          <Topic
            key={topicId}
            name={topicName}
            description={topicDescription}
            skillLevel={skillLevel}
            disciplineCode={disciplineCode}
            branchCode={branchCode}
            levelCode={levelCode}
            topicId={topicId}
            userIndex={userIndex}
          />
        );
      })}
    </div>
  );
};

export default Level;
