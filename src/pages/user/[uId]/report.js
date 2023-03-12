import User from "models/userSchema";
import connectMongo from "utils/connectMongo";
import { Inter } from "@next/font/google";
import styles from "./reportpage.module.css";
import { useModalContext } from "hooks/useModalContext";
import calculatePercentage from "utils/calculatePercentage";

const inter = Inter({ subsets: ["latin"] });

const ReportPage = ({ uId, userData }) => {
  const { skillLevelRange } = useModalContext();
  const { maxSkillLevel, minSkillLevel } = skillLevelRange;

  if (!userData?.name) {
    return (
      <article className={`${inter.className} ${styles.article}`}>
        <header className={styles.header}>
          <h2>Invalid user ID</h2>
        </header>
      </article>
    );
  }

  return (
    <article className={`${inter.className} ${styles.article}`}>
      <header className={styles.header}>
        <h1>Report Page of user {uId}</h1>
        <h2>{userData.name}</h2>
      </header>
      <div>
        {userData &&
          userData.disciplines.map((discipline) => {
            const { disciplineId, disciplineName, branches } = discipline;

            return (
              <div key={disciplineId}>
                <p>
                  Discipline:{" "}
                  <span className={`${styles.bold}`}>{disciplineName}</span>
                </p>
                <div className={styles.discipline}>
                  {branches.map((branch) => {
                    const { branchId, branchName, levels } = branch;

                    const calculateBranchProgress = () => {
                      const sum = levels
                        .map((level) => {
                          const { topics } = level;
                          return topics
                            .map((topic) => {
                              const { skillLevel } = topic;
                              return skillLevel;
                            })
                            .reduce((partialSum, nextItem) => {
                              return partialSum + nextItem;
                            }, 0);
                        })
                        .reduce((partialSum, nextItem) => {
                          return partialSum + nextItem;
                        }, 0);

                      const numberOfTopics = levels
                        .map((level) => {
                          const { topics } = level;
                          return topics.length;
                        })
                        .reduce((partialSum, nextItem) => {
                          return partialSum + nextItem;
                        }, 0);

                      return calculatePercentage(sum, numberOfTopics);
                    };

                    return (
                      <div
                        className={`${styles.indentation} ${styles.branch}`}
                        key={branchId}
                      >
                        <p>
                          Branch:{" "}
                          <span className={`${styles.bold}`}>{branchName}</span>
                          , progress: {calculateBranchProgress()}
                        </p>

                        {levels.map((level) => {
                          const { topics, levelCode } = level;
                          const summedSkillpoints = topics
                            .map((topic) => {
                              return topic.skillLevel;
                            })
                            .reduce((partialSum, nextItem) => {
                              return partialSum + nextItem;
                            }, 0);
                          const numberOfTopics = topics.length;
                          return (
                            <div className={`${styles.level}`} key={levelCode}>
                              <p>
                                Level:{" "}
                                <span className={`${styles.bold}`}>
                                  {levelCode}
                                </span>
                                , progress:{" "}
                                {calculatePercentage(
                                  summedSkillpoints,
                                  numberOfTopics,
                                  true,
                                  minSkillLevel,
                                  maxSkillLevel
                                )}
                              </p>
                              <div className={`${styles.topicContainer}`}>
                                {topics.map((topic) => {
                                  const { topicName, topicId, skillLevel } =
                                    topic;
                                  return (
                                    <div
                                      className={`${styles.indentation} ${styles.topic}`}
                                      key={topicId}
                                    >
                                      <p>
                                        Topic:{" "}
                                        <span className={`${styles.bold}`}>
                                          {topicName}
                                        </span>
                                        , skillLevel: {skillLevel}/
                                        {maxSkillLevel}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </article>
  );
};

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const uId = params.uId;
    await connectMongo();
    const user = await User.findOne({ userIndex: uId }).exec();
    const parsedUser = JSON.parse(JSON.stringify(user));
    return {
      props: {
        uId,
        userData: parsedUser,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
  }
}

export default ReportPage;
