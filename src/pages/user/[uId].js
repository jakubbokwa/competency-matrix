import User from "models/userSchema";
import connectMongo from "utils/connectMongo";
import { Inter } from "@next/font/google";
import styles from "./userpage.module.css";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const UserPage = ({ uId, userData }) => {
  const router = useRouter();

  const changeSkillLevel = async (data, level) => {
    const dataCopy = data;
    dataCopy.level = level;
    console.log(dataCopy);
    try {
      const response = await fetch(`http://localhost:3000/api/test`, {
        method: "PATCH",
        body: JSON.stringify(dataCopy),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const test = await response.json();
      console.log(test);
      router.replace(router.asPath, undefined, { scroll: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className={`${inter.className} ${styles.article}`}>
      <header className={styles.header}>
        <h1>Welcome to the user page of user {uId}</h1>
        <h2>{userData?.name || "Invalid user ID"}</h2>
      </header>
      {userData &&
        userData.disciplines.map((discipline) => {
          return (
            <section
              className={styles.disciplineWrapper}
              key={discipline.disciplineId}
            >
              <div className={styles.discipline}>
                <span className={styles.disciplineName}>
                  {discipline.disciplineName}
                </span>
              </div>
              <div className={styles.allBranchesWrapper}>
                {discipline.branches.map((branch) => {
                  return (
                    <div
                      className={styles.branchWrapper}
                      key={branch.branchId + 10}
                    >
                      <div
                        className={styles.branch}
                        style={{
                          backgroundColor: branch.color || null,
                        }}
                      >
                        {branch.branchName}
                      </div>
                      {branch.issues.length > 0 && (
                        <div className={styles.allIssuesWrapper}>
                          {branch.issues.map((issue) => {
                            return (
                              <div
                                className={styles.issueWrapper}
                                key={issue.issueId + 100}
                              >
                                <div
                                  className={styles.issue}
                                  style={{
                                    backgroundColor:
                                      issue.color || branch.color || null,
                                  }}
                                >
                                  {issue.issueName}
                                </div>
                                <div className={styles.allTopicsWrapper}>
                                  {issue.topics.map((topic) => {
                                    const topicData = {
                                      userIndex: userData.userIndex,
                                      discipline: discipline.disciplineCode,
                                      branch: branch.branchCode,
                                      issue: issue.issueCode,
                                      topic: topic.topicCode,
                                    };
                                    return (
                                      <div
                                        className={styles.topicWrapper}
                                        key={topic.topicId + Math.random()}
                                      >
                                        <div
                                          className={styles.topic}
                                          style={{
                                            backgroundColor:
                                              topic.color ||
                                              issue.color ||
                                              branch.color ||
                                              null,
                                          }}
                                        >
                                          {topic.topicName}
                                        </div>
                                        <div className={styles.topicLevels}>
                                          <div
                                            className={`${styles.juniorLevel} ${styles.level}`}
                                            style={
                                              topic.skillLevel === 1
                                                ? {
                                                    backgroundColor:
                                                      "greenyellow",
                                                  }
                                                : {}
                                            }
                                            onClick={() => {
                                              changeSkillLevel(topicData, 1);
                                            }}
                                          >
                                            junior
                                          </div>
                                          <div
                                            className={`${styles.midLevel} ${styles.level}`}
                                            style={
                                              topic.skillLevel === 2
                                                ? {
                                                    backgroundColor:
                                                      "greenyellow",
                                                  }
                                                : {}
                                            }
                                            onClick={() => {
                                              changeSkillLevel(topicData, 2);
                                            }}
                                          >
                                            mid
                                          </div>
                                          <div
                                            className={`${styles.seniorLevel} ${styles.level}`}
                                            style={
                                              topic.skillLevel === 3
                                                ? {
                                                    backgroundColor:
                                                      "greenyellow",
                                                  }
                                                : {}
                                            }
                                            onClick={() => {
                                              changeSkillLevel(topicData, 3);
                                            }}
                                          >
                                            senior
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {branch.topics.length > 0 && (
                        <div className={styles.allTopicsWrapper}>
                          {branch.topics.map((topic) => {
                            const topicData = {
                              userIndex: userData.userIndex,
                              discipline: discipline.disciplineCode,
                              branch: branch.branchCode,
                              topic: topic.topicCode,
                            };
                            return (
                              <div
                                className={styles.topicWrapper}
                                key={topic.topicId + 10000}
                              >
                                <div
                                  className={styles.topic}
                                  style={{
                                    backgroundColor:
                                      topic.color || branch.color || null,
                                  }}
                                >
                                  {topic.topicName}
                                </div>
                                <div className={styles.topicLevels}>
                                  <div
                                    className={`${styles.juniorLevel} ${styles.level}`}
                                    style={
                                      topic.skillLevel === 1
                                        ? {
                                            backgroundColor: "greenyellow",
                                          }
                                        : {}
                                    }
                                    onClick={() => {
                                      changeSkillLevel(topicData, 1);
                                    }}
                                  >
                                    junior
                                  </div>
                                  <div
                                    className={`${styles.midLevel} ${styles.level}`}
                                    style={
                                      topic.skillLevel === 2
                                        ? {
                                            backgroundColor: "greenyellow",
                                          }
                                        : {}
                                    }
                                    onClick={() => {
                                      changeSkillLevel(topicData, 2);
                                    }}
                                  >
                                    mid
                                  </div>
                                  <div
                                    className={`${styles.seniorLevel} ${styles.level}`}
                                    style={
                                      topic.skillLevel === 3
                                        ? {
                                            backgroundColor: "greenyellow",
                                          }
                                        : {}
                                    }
                                    onClick={() => {
                                      changeSkillLevel(topicData, 3);
                                    }}
                                  >
                                    senior
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
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

export default UserPage;
